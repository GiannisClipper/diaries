import { getFromList } from '../../helpers/getFromList';

const parsePaymentFromDB = ( data, genres, funds ) => ( {
    id: data._id,
    date: data.date,
    type: data.type,
    inSequence: data.inSequence,
    genre_name: getFromList( genres, 'id', data.genre_id ).name,
    incoming: data.incoming,
    outgoing: data.outgoing,
    remark: data.remark,
    fund_name: getFromList( funds, 'id', data.fund_id ).name,
} )

const parsePaymentToDB = ( data, genres, funds ) => ( {
    date: data.date,
    type: data.type,
    inSequence: data.inSequence,
    genre_id: getFromList( genres, 'name', data.genre_name ).id,
    incoming: data.incoming,
    outgoing: data.outgoing,
    remark: data.remark,
    fund_id: getFromList( funds, 'name', data.fund_name ).id,
} )

export { 
    parsePaymentFromDB, 
    parsePaymentToDB, 
};
