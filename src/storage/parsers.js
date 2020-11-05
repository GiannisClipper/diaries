const parseUserFromDB = ( data ) => ( {
    id: data._id,
    username: data.username,
    password: '',
    password2: '',
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

    if ( data.password ) {
        result.password = data.password;
    }

    return result;
}

const parseSigninFromDB = ( data ) => ( {
    token: data.token,
    username: data.username,
} )

const parseSigninToDB = ( data ) => ( {
    username: data.username,
    password: data.password,
} )

const parseSettingsFromDB = ( data ) => ( {
    theme: data.theme,
    centralDate: data.centralDate,
} )

const parseSettingsToDB = ( data ) => ( {
    theme: data.theme,
    centralDate: data.centralDate,
} )

export { parseUserFromDB, parseUserToDB, parseSigninFromDB, parseSigninToDB, parseSettingsFromDB, parseSettingsToDB };
