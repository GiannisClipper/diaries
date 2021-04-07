const stringToTime = value => {
    const digits ='0123456789';
    const parts = [ '' ];

    for ( const x of value ) {
        if ( digits.includes( x ) ) {
            parts[ parts.length - 1 ] += x;
        } else {
            parts.push( '' );
        }
    }

    if ( parts.length > 0 ) {

        while ( parts.length < 3 ) {
            parts.unshift( '00' );
        }

        return {
            hours: parseInt( parts[ 0 ] ),
            minutes: parseInt( parts[ 1 ] ),
            seconds: parseInt( parts[ 2 ] )
        }
    }

    return null;
}

const timeToString = ( { hours, minutes, seconds, separator } ) => {

    separator = separator || ':';

    hours = ( Number.isInteger( hours ) && hours > 0 ? String( hours ) + separator : '' );
    minutes = String( minutes ).padStart( 2, '0' ) + separator;
    seconds = String( seconds ).padStart( 2, '0' );

    return hours + minutes + seconds;
}

const timeToSeconds = time => {
    const seconds = 
        time.seconds + 
        time.minutes * 60 + 
        time.hours * 60 * 60;
    
        return seconds;
}

const secondsToTime = seconds => {
    const hours = parseInt( seconds / ( 60 * 60 ) );
    seconds -= hours * 60 * 60;

    const minutes = parseInt( seconds / 60 );
    seconds -= minutes * 60;
 
    return { hours, minutes, seconds };
}

export { stringToTime, timeToString, timeToSeconds, secondsToTime };
