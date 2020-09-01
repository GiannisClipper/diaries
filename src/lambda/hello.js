exports.handler = function( event, context, callback ) {
    callback( null, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        statusCode: 200,
        body: JSON.stringify( {
            hello: 'Hello from Diaries App!',
            front: 'For the front-end is used ReactJS.',
            back: 'For the back-end is used Lambda functions on Netlify.'
        } )
    } );
}