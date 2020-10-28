const jwt = require('jsonwebtoken');

const createToken = payload => {
    const secret = process.env.TOKEN_SECRET;
    const token = jwt.sign( payload, secret, { expiresIn: '1h' } );
    return token;
}

const verifyToken = token => {
    const secret = process.env.TOKEN_SECRET;
    let payload = {};

    console.log( 'token', token )
    token = token && token.substr( 0, 6 ) === 'Token ' ? token.split( ' ' )[ 1 ] : token;
    console.log( 'token', token )

    try {
        payload = jwt.verify( token, secret );
    } catch ( err ) { 
        payload = { error: err.message };
    }

    return payload;
}

export { createToken, verifyToken };