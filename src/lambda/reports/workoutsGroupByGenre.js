import { convertFieldTo, reduceField } from '../core/stages';
import { matchWorkouts, groupGenre, lookupGenre, sortGenre } from './workoutsStages';

const workoutsGroupByGenre = ( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } ) => {

    const matchDocuments = matchWorkouts( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } );
    
    const projectFields1 = { 
        $project: {
            _id: 0,
            genre_id: convertFieldTo( 'type_specs.genre_id', 'objectId' ),
            distance: convertFieldTo( 'type_specs.distance', 'decimal' ),
            duration: '$type_specs.duration',
        }
    }
        
    const projectFields2 = { 
        $project: {
            _id: 0,
            genre_code: reduceField( 'genre_.code' ),
            genre_name: reduceField( 'genre_.name' ),
            distance: convertFieldTo( 'distance', 'double' ),
            duration: 1,
            count: 1
        }
    }
    
    const stages = [ 
        matchDocuments,
        projectFields1,
        groupGenre,
        lookupGenre,
        projectFields2,
        sortGenre,
    ];

    return stages;
}

export default workoutsGroupByGenre;
export { workoutsGroupByGenre };