import { getFromList } from '../core/helpers/getFromList';

const parsePaymentFromDB = ( data ) => ( {
    id: data._id,
    diary_id: data.diary_id,
    date: data.date,
    index: data.index,
    type: data.type,
    genre_name: getFromList( data.genres, 'id', data.genre_id ).name,
    incoming: data.incoming,
    outgoing: data.outgoing,
    remark: data.remark,
    fund_name: getFromList( data.funds, 'id', data.fund_id ).name,
} )

const parsePaymentToDB = ( data ) => ( {
    diary_id: data.diary_id,
    date: data.date,
    index: data.index,
    type: data.type,
    genre_id: getFromList( data.genres, 'name', data.genre_name ).id,
    incoming: data.incoming,
    outgoing: data.outgoing,
    remark: data.remark,
    fund_id: getFromList( data.funds, 'name', data.fund_name ).id,
} )

export { 
    parsePaymentFromDB, 
    parsePaymentToDB, 
};
