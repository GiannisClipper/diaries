const parseUserFromDB = ( data ) => ( {
    id: data._id,
    username: data.username,
    password: data.password,
    password2: data.password,
    email: data.email,
    isAdmin: data.isAdmin,
    isUser: data.isUser,
    remark: data.remark,
} )

const parseUserToDB = ( data ) => {
    const result = {
        username: data.username,
        email: data.email,
        isAdmin: data.isAdmin,
        isUser: data.isUser,
        remark: data.remark,
    }

    if ( data.password !== undefined ) {
        result.password = data.password;
    }

    return result;
}

export { parseUserFromDB, parseUserToDB };
