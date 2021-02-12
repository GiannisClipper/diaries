const parseUserFromDB = ( data ) => ( {
    id: data._id,
    username: data.username,
    password: '',
    password2: '',
    email: data.email,
    type: data.type,
    remark: data.remark,
} )

const parseUserToDB = ( data ) => {
    const result = {
        username: data.username,
        email: data.email,
        type: data.type,
        remark: data.remark,
    }

    if ( data.password ) {
        result.password = data.password;
    }

    return result;
}

export { parseUserFromDB, parseUserToDB };
