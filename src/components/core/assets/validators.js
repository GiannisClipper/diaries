const _isBlank = value => !value || !value.trim() ? true : false;

const _isFound = ( values, value, index = -1 ) => {
    for ( let i = 0; i < values.length; i++ ) {
        if ( i !== index && values[ i ] === value ) {
            return true;
        }
    }
    return false;
}

const isBlank = ( lexicon, inputLabel, value ) =>
    _isBlank( value )
        ? `${ inputLabel }: ${ lexicon.core.isBlank }`
        : null;

const isFound = ( lexicon, inputLabel, values, value, index ) =>
    ! _isBlank( value ) && _isFound( values, value, index )
        ? `${ inputLabel }: ${ lexicon.core.isFound }`
        : null;

const isNotFound = ( lexicon, inputLabel, values, value ) =>
    ! _isFound( values, value )
        ? `${ inputLabel }: ${ lexicon.core.isNotFound }`
        : null;

export default { isBlank, isFound, isNotFound };
export { isBlank, isFound, isNotFound };