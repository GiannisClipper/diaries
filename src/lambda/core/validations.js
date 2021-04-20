const isEmpty = ( { collection, field, value } ) => {

    if ( !value || !value.trim() ) {
        return { type: 'isEmpty', collection, field, value };
    }
    return null;
}

const isFound = async ( { db, lookupCollection, lookupFields, message } ) => {

    const filters = {};

    Object.keys( lookupFields ).forEach( key => filters[ key ] = lookupFields[ key ] );

    const result = await db.collection( lookupCollection ).findOne( filters );

    if ( result ) {
        return { type: 'isFound', lookupCollection, lookupFields, message };
    }
    return null;
}

export { isEmpty, isFound };