import { splitWeeks, YYYYMMDDToDate, dateToYYYYMMDD } from '../../components/core/helpers/dates';
import { convertFieldTo } from '../core/stages';
import { matchWorkouts, groupWeek, sortWeek } from './workoutsStages';

const workoutsGroupByWeek = ( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } ) => {

    const weeks = splitWeeks( YYYYMMDDToDate( dateFrom ), YYYYMMDDToDate( dateTill ) );
    const lastDate = weeks[ weeks.length - 1 ].dateTill;
    weeks.push( { dateFrom: lastDate, dateTill: lastDate } );  // to support the operation of `bucket.boundaries` in `groupWeek` stage
    weeks.forEach( ( x, i ) => weeks[ i ] = `${ dateToYYYYMMDD( x.dateFrom ) }-${ dateToYYYYMMDD( x.dateTill ) }` );

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