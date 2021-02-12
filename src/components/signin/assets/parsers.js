const parseSigninFromDB = ( data ) => ( {
    token: data.token,
    username: data.username,
    user_id: data.user_id,
} )

const parseSigninToDB = ( data ) => ( {
    username: data.username,
    password: data.password,
} )

export { 
    parseSigninFromDB,
    parseSigninToDB,
};
