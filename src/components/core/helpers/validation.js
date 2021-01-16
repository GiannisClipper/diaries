const isBlank = value => !value || !value.trim() ? true : false;

const isFound = ( values, value, index = -1 ) => {
    for ( let i = 0; i < values.length; i++ ) {
        if ( i !== index && values[ i ] === value ) {
            return true;
        }
    }
    return false;
}

export { isBlank, isFound };