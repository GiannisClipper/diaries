import { convertFieldTo } from '../core/stages';
import { matchWorkouts, groupMonth, sortMonth } from './workoutsStages';

const workoutsGroupByEquip = ( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } ) => {

    const matchDocuments = matchWorkouts( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } );
    
    const projectFields1 = { 
        $project: {
            _id: 0,
            month: { $substr: [ "$date", 0, 6 ] },
            distance: convertFieldTo( 'type_specs.distance', 'decimal' ),
            duration: '$type_specs.duration',
        }
    }
        
    const projectFields2 = { 
        $project: {
            _id: 0,
            month: 1,
            distance: convertFieldTo( 'distance', 'double' ),
            duration: 1,
            count: 1
        }
    }
    
    const stages = [ 
        matchDocuments,
        projectFields1,
        groupMonth,
        projectFields2,
        sortMonth,
    ];

    return stages;
}

export default workoutsGroupByEquip;
export { workoutsGroupByEquip };