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
    collectionName: 'diaries',
    auth,
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
} );
