const responseOnSuccess = res => ( {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    statusCode: 200,
    body: JSON.stringify( res )
} );

const responseOnError = err => ( {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    statusCode: 500,
    body: JSON.stringify( { message: err.message } )
} );

export { responseOnSuccess, responseOnError };