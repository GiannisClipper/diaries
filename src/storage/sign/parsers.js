const parseSigninFromDB = ( data ) => ( {
    token: data.token,
    username: data.username,
} )

const parseSigninToDB = ( data ) => ( {
    username: data.username,
    password: data.password,
} )

export { 
    parseSigninFromDB,
    parseSigninToDB,
};
