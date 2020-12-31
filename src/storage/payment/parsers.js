const getFromList = ( list, field, value ) => {
    const result = list.filter( x => x[ field ] === value );
    return result.length > 0 ? result[ 0 ] : {};
}

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

const parseGenreFromDB = data => ( {
    id: data._id,
    code: data.code,
    name: data.name,
    isIncoming: data.isIncoming,
    isOutgoing: data.isOutgoing,
} )

const parseGenreToDB = data => ( {
    code: data.code,
    name: data.name,
    isIncoming: data.isIncoming,
    isOutgoing: data.isOutgoing,
} );

const parseFundFromDB = data => ( {
    id: data._id,
    code: data.code,
    name: data.name,
} )

const parseFundToDB = data => ( {
    code: data.code,
    name: data.name
} );

export { 
    getFromList, 
    parsePaymentFromDB, 
    parsePaymentToDB, 
    parseGenreFromDB, 
    parseGenreToDB, 
    parseFundFromDB, 
    parseFundToDB 
};
