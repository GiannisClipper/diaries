const parseErrors = ( { lexicon, errors } ) => {

    const result = [];

    for ( const error of errors ) {
        const { type, message } = error;
        const [ entity, field ] = message.split( '.' );
        result.push( `${ lexicon[ entity ][ field ] }: ${ lexicon.core[ type ] }` );
    }

    return result;
}

export { parseErrors };