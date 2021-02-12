import { reprToYYYYMMDD } from '../../core/helpers/dates.js'

const parseReportToDB = ( data ) => ( {
    type: data.type,
    descr: data.descr,
    dateFrom: reprToYYYYMMDD( data.dateFrom ),
    dateTill: reprToYYYYMMDD( data.dateTill ),
} )

export { parseReportToDB };