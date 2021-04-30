import { convertFieldTo, reduceField } from '../core/stages';
import { matchWorkouts, lookupGenre, lookupEquip, sortDate } from './workoutsStages';

const workouts = ( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } ) => {

    const matchDocuments = matchWorkouts( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } );
    
    const selectFields1 = { 
        $project: {
            _id: 0,
            date: 1,
            index: 1,
            type: 1,
            remark: '$type_specs.remark',
            duration: '$type_specs.duration',
            distance: '$type_specs.distance',
            genre_id: convertFieldTo( 'type_specs.genre_id', 'objectId' ),
            equip_id: convertFieldTo( 'type_specs.equip_id', 'objectId' )
        }
    }
    
    const selectFields2 = { 
        $project: {
            date: 1,
            index: 1,
            type: 1,
            remark: 1,
            duration: 1,
            distance: 1,
            genre_name: reduceField( 'genre_.name' ),
            equip_name: reduceField( 'equip_.name' )
        }
    }
    
    const stages = [ 
        matchDocuments,
        selectFields1,
        lookupGenre,
        lookupEquip,
        selectFields2,
        sortDate,
    ];

    return stages;
}

export default workouts;
export { workouts };