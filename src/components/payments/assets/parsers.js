const parsePaymentFromDB = type_specs => {

    const { genre_id, genre_name, revenue, expense, remark, fund_id, fund_name } = type_specs;

    return {
        genre_id,
        genre_name,
        revenue,
        expense,
        remark,
        fund_id,
        fund_name
    }
}

const parsePaymentToDB = type_specs => {

    const { genre_id, revenue, expense, remark, fund_id } = type_specs;

    return {
        genre_id,
        revenue,
        expense,
        remark,
        fund_id
    }
}

export { 
    parsePaymentFromDB, 
    parsePaymentToDB, 
};
