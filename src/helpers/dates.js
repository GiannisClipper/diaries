const dayNames = [
    "Κυριακή",
    "Δευτέρα",
    "Τρίτη",
    "Τετάρτη",
    "Πέμπτη",
    "Παρασκευή",
    "Σάββατο"
];

const monthNames = [
    "Ιανουάριος",
    "Φεβρουάριος",
    "Μάρτιος",
    "Απρίλιος",
    "Μάιος",
    "Ιούνιος",
    "Ιούλιος",
    "Αύγουστος",
    "Σεπτέμβριος",
    "Οκτώβριος",
    "Νοέμβριος",
    "Δεκέμβριος"
];

const isLeap = value => {
    return ( ( value % 4 === 0 ) && ( value % 100 !== 0 || value % 400 === 0 ) );
}

const isYear = ( value, from, till ) => {
    from = from || 1900;
    till = till || 2099;
    return ( value >= from && value <= till );
}

const isMonth = value => {
    return ( value >= 1 && value <= 12 );
}

const isDateNum = ( value, month, year ) => {
    year = year || NaN;

    if ( value >= 1 ) {
        if ( value <= 28 ) {
            return true;
        } else if ( value === 29 && ( month !== 2 || isLeap( year ) ) ) {
            return true;
        } else if ( value === 30 && month !== 2 ) {
            return true;
        } else if ( value === 31 && [ 1, 3, 5, 7, 8, 10, 12 ].includes( month ) ) {
            return true;
        }
    }
    return false;
}

const splitYYYYMMDD = value => {
    const year = parseInt( value.substring( 0, 4 ) );
    const month = parseInt( value.substring( 4, 6 ) );
    const dateNum = parseInt( value.substring( 6, 8 ) );
    return { year, month, dateNum };
}

const isYYYYMMDD = value => {
    const { year, month, dateNum } = splitYYYYMMDD( value );
    return ( isYear( year ) && isMonth( month ) && isDateNum( dateNum, month, year ) );
}

const dateToYYYYMMDD = date => {
    const year = date.getFullYear();
    const month = ( date.getMonth() + 1 ).toString().padStart( 2, '0' );
    const dateNum = date.getDate().toString().padStart( 2, '0' );
    return year + month + dateNum;
}

const YYYMMDDToDate = value => {
    let retval = null;
    if ( isYYYYMMDD( value ) ) {
        const { year, month, dateNum } = splitYYYYMMDD( value );
        retval = new Date( year, month - 1, dateNum, 12, 0, 0, 0 );
    }
    return retval;
}

const reprToYYYMMDD = ( value, pattern ) => {
    value = value || '';
    pattern = ( pattern || 'DD/MM/YYYY' ).toUpperCase();
    const YMD = { Y: '', M: '', D: '' };
    value.split( '' ).map( ( x, i ) => YMD[ pattern[ i ] ] += x )
    const retval = YMD.Y + YMD.M + YMD.D;
    return isYYYYMMDD( retval ) ? retval : '';
}

const YYYMMDDToRepr = ( value, pattern ) => {
    let retval = '';
    if ( isYYYYMMDD( value ) ) {
        pattern = ( pattern || 'D/M/Y' ).toUpperCase();
        const YMD = {
            Y: value.substring( 0, 4 ),
            M: value.substring( 4, 6 ),
            D: value.substring( 6, 8 ), 
        };
        pattern.split( '' ).map( x => retval += x in YMD ? YMD[ x ] : x );
    }
    return retval;
}

const daysBetween = ( fromDate, tillDate ) => {
    const diff = ( tillDate.getTime() - fromDate.getTime() );
    return Math.round( diff / ( 24 * 60 * 60 * 1000 ) );  // (1day = 24h * 60min * 60sec * 1000msec)
};

const shiftDate = ( date, days ) => {
    let newDate = new Date( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );  // (1day = 24h * 60min * 60sec * 1000msec)

    // Adjust `newDate` considering the starting or ending of the Daylight Saving Time.
    const timezoneDiff = date.getTimezoneOffset() - newDate.getTimezoneOffset();

    if ( timezoneDiff !== 0 ) {
        newDate = new Date( newDate.getTime() - timezoneDiff * 60 * 1000 );    
    };

    return newDate;
}

export { 
    dayNames,
    monthNames,
    isLeap,
    isYear,
    isMonth,
    isDateNum,
    dateToYYYYMMDD,
    YYYMMDDToDate,
    reprToYYYMMDD,
    YYYMMDDToRepr,
    daysBetween,
    shiftDate
};