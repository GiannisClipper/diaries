import { setDateStr } from '@giannisclipper/date';

const parseReportToDB = ( data ) => {
    const result = {
        diary_id: data.diary_id,
        type: data.type,
        descr: data.descr,
        dateFrom: setDateStr( data.dateFrom ),
        dateTill: setDateStr( data.dateTill ),
        groupBy: data.groupBy,
    };

    const { type_specs } = data;

    if ( result.type === 'note' ) {
        result.type_specs = {};

    } else if ( result.type === 'payment' ) {
            result.type_specs = {
            genre_id: type_specs.genre_id,
            genre_name: type_specs.genre_name,
            genre_code: type_specs.genre_code,
            fund_id: type_specs.fund_id,
            fund_name: type_specs.fund_name,
            fund_code: type_specs.fund_code
        };

    } else if ( result.type === 'workout' ) {
        result.type_specs = {
            genre_id: type_specs.genre_id,
            genre_name: type_specs.genre_name,
            genre_code: type_specs.genre_code,
            equip_id: type_specs.equip_id,
            equip_name: type_specs.equip_name,
            fund_equip: type_specs.equip_code
        };
    }

    return result;
}

export { parseReportToDB };