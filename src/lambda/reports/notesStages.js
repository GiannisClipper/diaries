const matchNotes = ( { diary_id, type, dateFrom, dateTill } ) => {

    const filters = { 
        diary_id,
        type,
        date: { 
            $gte: dateFrom, 
            $lte: dateTill
        },
    }

    return { 
        $match: filters
    };
}

const sortDate = {
    $sort: { date: 1, index: 1 }
}

export {
    matchNotes,
    sortDate,
}