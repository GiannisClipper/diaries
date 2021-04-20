import { ObjectId } from "bson";

const isEmpty = ( { value, message } ) => {

    if ( !value || !value.trim() ) {
        return { type: 'isEmpty', message, value };
    }
    return null;
}

const isAlreadyExists = async ( { db, lookupCollection, lookupFields, excludedId, message } ) => {

    const filters = {};

    if ( excludedId ) {
        filters._id = { $ne: ObjectId( excludedId ) };
    }

    Object.keys( lookupFields ).forEach( key => filters[ key ] = lookupFields[ key ] );

    const result = await db.collection( lookupCollection ).findOne( filters );

    if ( result ) {
        return { type: 'isAlreadyExists', message, lookupCollection, lookupFields };
    }
    return null;
}

const isUsedBy = async ( { db, lookupCollection, lookupFields, message } ) => {

    const filters = {};

    Object.keys( lookupFields ).forEach( key => filters[ key ] = lookupFields[ key ] );

    const result = await db.collection( lookupCollection ).findOne( filters );

    if ( result ) {
        return { type: 'isUsedBy', message, lookupCollection, lookupFields };
    }
    return null;
}

export { isEmpty, isAlreadyExists, isUsedBy };