import { reprToYYYYMMDD, YYYYMMDDToRepr } from '../../core/helpers/dates.js'

const parseDiaryFromDB = ( data ) => ( {
    id: data._id,
    user_id: data.user_id,
    title: data.title,
    startDate: YYYYMMDDToRepr( data.startDate ),
} )

const parseDiaryToDB = ( data ) => ( {
    user_id: data.user_id,
    title: data.title,
    startDate: reprToYYYYMMDD( data.startDate ),
} )

export { parseDiaryFromDB, parseDiaryToDB };
