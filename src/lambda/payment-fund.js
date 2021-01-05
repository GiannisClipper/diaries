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
    collectionName: 'payments_funds',
    auth,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
} );
