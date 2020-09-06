const fetch = require( 'node-fetch' );

const realFetch = ( url, args ) => {
    args.headers = { 'Content-Type': 'application/json; charset=utf-8' };

    return fetch( url, args )
        .then( res => {
            if ( [ 200, 201 ].includes( res.status ) ) {
                return res.json();
            }
            throw new Error( res.statusText );
        } );
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
                inSequence: 0
            },
            {
                _id: strTill,
                date: strTill,
                note: strTill + '/' + url,
                inSequence: 0
            }
        ];

    } else if ( url === '/.netlify/functions/create-entry' ) {
        return { insertedId: `${Math.random()}` };
    }
}

export { realFetch, mockFetch };
