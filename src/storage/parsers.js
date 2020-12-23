import { reprToYYYYMMDD, YYYYMMDDToRepr } from '../helpers/dates.js'

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
    centralDate: YYYYMMDDToRepr( data.centralDate ),
} )

const parseSettingsToDB = ( data ) => ( {
    theme: data.theme,
    centralDate: reprToYYYYMMDD( data.centralDate ),
} )

const parseReportToDB = ( data ) => ( {
    type: data.type,
    descr: data.descr,
    dateFrom: reprToYYYYMMDD( data.dateFrom ),
    dateTill: reprToYYYYMMDD( data.dateTill ),
} )

export { 
    parseSigninFromDB,
    parseSigninToDB,
    parseSettingsFromDB,
    parseSettingsToDB,
    parseReportToDB
};
