const isEmpty = ( { collection, field, value } ) => {

    if ( !value || !value.trim() ) {
        return { type: 'isEmpty', collection, field, value };
    }
    return null;
}

const isFound = async ( { db, collection, field, value, lookupCollection, lookupField } ) => {

    lookupField = lookupField || field;

    const result = await db.collection( lookupCollection ).findOne( { [ lookupField ]: value } );

    if ( result ) {
        return { type: 'isFound', collection, field, value, lookupCollection, lookupField };
    }
    return null;
}

export { isEmpty, isFound };