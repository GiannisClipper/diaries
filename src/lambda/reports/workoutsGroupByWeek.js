import { calcWeeksOfRange, calcDateByDaysAddition, setDateStr } from '@giannisclipper/date';
import { convertFieldTo } from '../core/stages';
import { matchWorkouts, groupWeek, sortWeek } from './workoutsStages';

const workoutsGroupByWeek = ( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } ) => {

    const weeks = calcWeeksOfRange( dateFrom, dateTill );
    let lastDate = weeks[ weeks.length - 1 ][ 1 ];
    lastDate = calcDateByDaysAddition( lastDate, 1 );
    weeks.push( [ lastDate, lastDate ] );  // due the way that works `bucket.boundaries` in `groupWeek` stage
    weeks.forEach( ( x, i ) => weeks[ i ] = `${ setDateStr( x[ 0 ] ) }` );

    const matchDocuments = matchWorkouts( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } );

    const projectFields1 = { 
        $project: {
            _id: 0,
            date: "$date",
            distance: convertFieldTo( 'type_specs.distance', 'decimal' ),
            duration: '$type_specs.duration',
        }
    }
        
    const projectFields2 = { 
        $project: {
            _id: 0,
            week: "$_id",
            distance: convertFieldTo( 'distance', 'double' ),
            duration: 1,
            count: 1
        }
    }
    
    const stages = [
        matchDocuments,
        projectFields1,
        groupWeek( weeks ),
        projectFields2,
        sortWeek,
    ];

    return stages;
}

export default workoutsGroupByWeek;
export { workoutsGroupByWeek };