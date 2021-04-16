import getToken from './getToken';

const fetch = require( 'node-fetch' );

const realFetch = async ( url, args ) => {

    const token = getToken();

    args.headers = { 
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${ token }`
    };

    const error = { message: '' };

    let res = await fetch( url, args );

    if ( ![ 200, 201 ].includes( res.status ) ) {
        error.message += `${ res.status } ${ res.statusText }`;
    }
  
    try {
        res = await res.json();
    } catch( err ) {
        res = {};
    }

    if ( error.message !== '' ) {
        const message = res.message && res.message !== error.message 
            ? `${ error.message } (${ res.message })`
            : error.message;
        throw new Error( message );
    }
 
    return res;
}

const mockFetch = ( url, args ) => {
    args.headers = { 'Content-Type': 'application/json; charset=utf-8' };
    const run = () => { 
        console.log( 'mockFetch...', url, args.method );
        return mockResult( url, args );
    }
    return new Promise( ( resolve, reject ) => {
        setTimeout( () => resolve( run() ), 1500 );
    } );
}

const mockResult = ( url, args ) => {

    if ( url.startsWith( '/.netlify/functions/retrieve-dates?range=' ) ) {
        const range = url.split( '=' )[1];
        const [ strFrom, strTill ] = range.split( '-' );

        return [
            {
                _id: strFrom,
                date: strFrom,
                note: strFrom + '/' + url,
                index: 0
            },
            {
                _id: strTill,
                date: strTill,
                note: strTill + '/' + url,
                index: 0
            }
        ];

    } else if ( url === '/.netlify/functions/create-entry' ) {
        return { insertedId: `${ Math.random() }` };
    }
}

const doFetch = ( url, args, onDone, onError, dataFromDB ) => {
    console.log( 'Requesting... ', url, args.method )

    realFetch( url, args )
    .then( res => {
        console.log( JSON.stringify( res ) );
        onDone( { dataFromDB: dataFromDB( res ) } );
    } )
    .catch( err => { 
        alert( err.message );
        onError( { error: err.message } );
    } );
}

export { realFetch, mockFetch, doFetch };
