const responseOnSuccess = ( { result,statusCode } ) => ( {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    statusCode: statusCode || 200,
    body: JSON.stringify( result )
} );

const responseOnError = error => ( {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    statusCode: 500,
    body: JSON.stringify( { message: error.message } )
} );

export { responseOnSuccess, responseOnError };