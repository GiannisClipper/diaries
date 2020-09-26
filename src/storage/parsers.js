const parseUserFromDB = ( data ) => ( {
    id: data._id,
    username: data.username,
    password: data.password,
    email: data.email,
    isAdmin: data.isAdmin,
    isUser: data.isUser,
    remark: data.remark,
} )

const parseUserToDB = ( data ) => ( {
    username: data.username,
    password: data.password,
    email: data.email,
    isAdmin: data.isAdmin,
    isUser: data.isUser,
    remark: data.remark,
} )

export { parseUserFromDB, parseUserToDB };
