const parsePaymentFromDB = ( data ) => ( {
    id: data._id,
    diary_id: data.diary_id,
    date: data.date,
    index: data.index,
    type: data.type,
    genre_id: data.genre_id,
    incoming: data.incoming,
    outgoing: data.outgoing,
    remark: data.remark,
    fund_id: data.fund_id,
} )

const parsePaymentToDB = ( data ) => ( {
    diary_id: data.diary_id,
    date: data.date,
    index: data.index,
    type: data.type,
    genre_id: data.genre_id,
    incoming: data.incoming,
    outgoing: data.outgoing,
    remark: data.remark,
    fund_id: data.fund_id,
} )

export { 
    parsePaymentFromDB, 
    parsePaymentToDB, 
};
