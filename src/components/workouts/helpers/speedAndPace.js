import { stringToTime, timeToString, timeToSeconds, secondsToTime } from '../../core/helpers/times';

const speed = ( { duration, distance } ) => {

    if ( distance ) {
        distance = parseFloat( distance );
        const time = stringToTime( duration );

        if ( time ) {
            const seconds = timeToSeconds( time );
            const kmPerHour = ( ( distance / seconds ) * 60 * 60 ).toFixed( 3 );
            return kmPerHour;
        }
    }

    return null;
}

const pace = ( { duration, distance } ) => {

    if ( distance ) {
        distance = parseFloat( distance );
        const time = stringToTime( duration );

        if ( time ) {
            const seconds = timeToSeconds( time );
            const secondsPerKm = Math.round( seconds / distance, 0 );
            const timePerKm = secondsToTime( secondsPerKm );
            return timeToString( timePerKm );
        }
    }

    return null;
} 

export { speed, pace };