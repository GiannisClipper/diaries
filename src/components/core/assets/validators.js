const _isBlank = value => !value || !value.trim() ? true : false;

const _isFound = ( values, value, index = -1 ) => {
    for ( let i = 0; i < values.length; i++ ) {
        if ( i !== index && values[ i ] === value ) {
            return true;
        }
    }
    return false;
}

const isBlank = ( inputLabel, value ) =>
    _isBlank( value )
        ? `Η τιμή στο πεδίο '${ inputLabel }' δεν μπορεί να είναι κενή.`
        : null;

const isFound = ( inputLabel, values, value, index ) =>
    ! _isBlank( value ) && _isFound( values, value, index )
        ? `Η τιμή στο πεδίο '${ inputLabel }' υπάρχει ήδη.`
        : null;

const isNotFound = ( inputLabel, values, value ) =>
    ! _isFound( values, value )
        ? `Η τιμή στο πεδίο '${ inputLabel }' δεν είναι έγκυρη.`
        : null;

export { isBlank, isFound, isNotFound };