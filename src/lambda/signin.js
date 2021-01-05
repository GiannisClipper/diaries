import { createHandler } from './common/handler';
import { createToken } from './common/token';
const bcrypt = require( 'bcryptjs' );

const putMethod = async ( event, collection, payload ) => {
    const body = JSON.parse( event.body );
    const data = body.data;

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

    return result;
}

exports.handler = createHandler( {
    collectionName: 'users',
    putMethod
} );
