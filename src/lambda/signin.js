import { createHandler } from './core/handler';
import { createToken } from './core/token';
import { isEmptyUsername, isEmptyPassword } from './users/validators';

const bcrypt = require( 'bcryptjs' );

const putMethod = async ( event, db, collectionName, payload ) => {
    const body = JSON.parse( event.body );
    const data = body.data;

    let errors = [];
    errors.push( isEmptyUsername( { data } ) );
    errors.push( isEmptyPassword( { data } ) );
    errors = errors.filter( x => x !== null );

    if ( errors.length > 0 ) {
        return { result: errors, statusCode: 422 };
    }

    const collection = db.collection( collectionName );
    let result = await collection.findOne( { username: data.username } );

    if ( !result || !bcrypt.compareSync( data.password, result.password ) ) {
        result = {};

    } else {
        const payload = { user_id: result._id, }
        result = { 
            token: createToken( payload ),
            user_id: result._id,
            username: result.username,
            theme: result.theme,
            language: result.language,
        };
    }

    return { result };
}

exports.handler = createHandler( {
    collectionName: 'users',
    putMethod
} );
