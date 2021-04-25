import { convertFieldTo, reduceField } from '../core/stages';
import { matchWorkouts, groupEquip, lookupEquip, sortEquip } from './workoutsStages';

const workoutsGroupByEquip = ( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } ) => {

    const matchDocuments = matchWorkouts( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } );
    
    const projectFields1 = { 
        $project: {
            _id: 0,
            equip_id: convertFieldTo( 'type_specs.equip_id', 'objectId' ),
            distance: convertFieldTo( 'type_specs.distance', 'decimal' ),
            duration: '$type_specs.duration',
        }
    }
        
    const projectFields2 = { 
        $project: {
            _id: 0,
            equip_code: reduceField( 'equip_.code' ),
            equip_name: reduceField( 'equip_.name' ),
            distance: convertFieldTo( 'distance', 'double' ),
            duration: 1,
            count: 1
        }
    }
    
    const stages = [ 
        matchDocuments,
        projectFields1,
        groupEquip,
        lookupEquip,
        projectFields2,
        sortEquip,
    ];

    return stages;
}

export default workoutsGroupByEquip;
export { workoutsGroupByEquip };