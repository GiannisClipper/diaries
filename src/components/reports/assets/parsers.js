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

    const { type_specs } = data;

    if ( result.type === 'payment' ) {
        result.type_specs = {
            genre_id: type_specs.genre_id,
            genre_name: type_specs.genre_name,
            genre_code: type_specs.genre_code,
            fund_id: type_specs.fund_id,
            fund_code: type_specs.fund_code,
            fund_name: type_specs.fund_name
        }

    } else if ( result.type === 'workout' ) {
        result.type_specs = {
            genre_id: type_specs.genre_id,
            genre_name: type_specs.genre_name,
            equip_id: type_specs.equip_id,
            equip_name: type_specs.equip_name
        }
    }

    return result;
}

export { parseReportToDB };