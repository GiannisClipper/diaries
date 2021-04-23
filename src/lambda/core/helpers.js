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
    value = value || '';
    const year = parseInt( value.substring( 0, 4 ) );
    const month = parseInt( value.substring( 4, 6 ) );
    const dateNum = parseInt( value.substring( 6, 8 ) );
    return { year, month, dateNum };
}

const isYYYYMMDD = value => {
    const { year, month, dateNum } = splitYYYYMMDD( value );
    return ( isYear( year ) && isMonth( month ) && isDateNum( dateNum, month, year ) );
}

export { isYYYYMMDD };