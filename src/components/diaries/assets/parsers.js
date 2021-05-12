import { setDateStr, setDateRepr } from '@giannisclipper/date'

const parseDiaryFromDB = ( data ) => ( {
    id: data._id,
    user_id: data.user_id,
    title: data.title,
    startDate: setDateRepr( data.startDate ),
} )

const parseDiaryToDB = ( data ) => ( {
    user_id: data.user_id,
    title: data.title,
    startDate: setDateStr( data.startDate ),
} )

export { parseDiaryFromDB, parseDiaryToDB };
