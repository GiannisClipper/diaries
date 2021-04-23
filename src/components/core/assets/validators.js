const isEmpty = ( { value, message } ) => {

    if ( !value || !value.trim() ) {
        return { type: 'isEmpty', message, value };
    }
    return null;
}

const isInvalid = ( { value, values, calculation, message } ) => {

    if ( values ) {
        if ( ! values.includes( value ) ) {
            return { type: 'isInvalid', message, value, values };
        }
    }

    if ( calculation ) {
        if ( ! calculation( value ) ) {
            return { type: 'isInvalid', message, value, values };
        }
    }

    return null;
}

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

export default { isEmpty, isInvalid, isBlank, isFound, isNotFound };
export { isEmpty, isInvalid, isBlank, isFound, isNotFound };