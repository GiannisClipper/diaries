const parsePaymentFromDB = data => {

    const { _id, diary_id, date, index, type, type_specs } = data;
    const { genre_id, revenue, expense, remark, fund_id } = type_specs;

    return {
        id: _id,
        diary_id,
        date,
        index,
        type,
        type_specs: {
            genre_id,
            revenue,
            expense,
            remark,
            fund_id
        }
    }
}

const parsePaymentToDB = data => {

    const { diary_id, date, index, type, type_specs } = data;
    const { genre_id, revenue, expense, remark, fund_id } = type_specs;

    return {
        diary_id,
        date,
        index,
        type,
        type_specs: {
            genre_id,
            revenue,
            expense,
            remark,
            fund_id
        }
    }
}


export { 
    parsePaymentFromDB, 
    parsePaymentToDB, 
};
