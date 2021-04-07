import { reprToYYYYMMDD } from '../../core/helpers/dates.js'

const parseReportToDB = ( data ) => {
    const result = {
        diary_id: data.diary_id,
        type: data.type,
        descr: data.descr,
        dateFrom: reprToYYYYMMDD( data.dateFrom ),
        dateTill: reprToYYYYMMDD( data.dateTill ),
        groupBy: data.groupBy,
    };

    if ( result.type === 'payment' ) {
        result.genre_id = data.genre_id;
        result.genre_name = data.genre_name;
        result.fund_id = data.fund_id;
        result.fund_name = data.fund_name;

    } else if ( result.type === 'workout' ) {
        result.genre_id = data.genre_id;
        result.genre_name = data.genre_name;
        result.equip_id = data.equip_id;
        result.equip_name = data.equip_name;
    }

    return result;
}

export { parseReportToDB };