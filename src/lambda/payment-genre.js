import {
    createHandler,
    auth,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
}
from './common/handler';

exports.handler = createHandler( { 
    collectionName: 'payments_genres',
    auth,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
} );
