const parseSigninFromDB = ( data ) => ( {
    username: data.username,
    user_id: data.user_id,
    token: data.token,
} )

const parseSigninToDB = ( data ) => ( {
    username: data.username,
    password: data.password,
} )

export { 
    parseSigninFromDB,
    parseSigninToDB,
};
