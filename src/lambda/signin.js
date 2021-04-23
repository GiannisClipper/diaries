import { createHandler } from './core/handler';
import { createToken } from './core/token';
import { createValidation } from './signin/validations';

const bcrypt = require( 'bcryptjs' );

const parseData = data => ( {
    username: data.username,
    password: data.password,
} );

const postMethod = async ( event, db, collectionName ) => {
    const body = JSON.parse( event.body );
    const data = parseData( body.data || {} );

    const errors = await createValidation( { db, data } );
    if ( errors.length > 0 ) {
        return { result: errors, statusCode: 422 };
    }

    const collection = db.collection( collectionName );
    let result = await collection.findOne( { username: data.username } );

    if ( ! result || ! bcrypt.compareSync( data.password, result.password ) ) {
        return { result: [ { type: 'isInvalid', message: 'signin.credentials' } ], statusCode: 422 };

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
    postMethod
} );
