import { reprToYYYYMMDD, YYYYMMDDToRepr } from '../../helpers/dates.js'

const parseDiaryFromDB = ( data ) => ( {
    id: data._id,
    title: data.title,
    startDate: YYYYMMDDToRepr( data.startDate ),
} )

const parseDiaryToDB = ( data ) => ( {
    title: data.title,
    startDate: reprToYYYYMMDD( data.startDate ),
} )

export { parseDiaryFromDB, parseDiaryToDB };
