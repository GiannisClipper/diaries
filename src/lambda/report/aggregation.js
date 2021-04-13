const matchPayments = ( { diary_id, type, dateFrom, dateTill, genre_id, fund_id } ) => {
    const filters = { 
        diary_id,
        type,
        date: { 
            $gte: dateFrom, 
            $lte: dateTill
        },
    }

    if ( genre_id ) {
        filters[ 'type_specs.genre_id' ] = genre_id;
    }

    if ( fund_id ) {
        filters[ 'type_specs.fund_id' ] = fund_id;
    }

    return { 
        $match: filters
    };
};


const convertFieldTo = ( field, type, onError ) => ( { 
    $convert: { 
        input: `$${ field }`,
        to: type,
        onError: onError || null 
    }
} )

const reduceField = ( field ) => ( {
    $reduce: {
        input: `$${ field }`,
        initialValue: "",
        in: { $concat : [ "$$value", "$$this" ] }
    }
} )

const groupMonth = {
    $group: {
        _id : "$month",
        month : { $first: "$month" },
        expense: { $sum: "$expense" },
        revenue: { $sum: "$revenue" },
        count: { $sum: 1 }
    }
}

const groupWeek = ( weeks ) => ( {
    $bucket: {
        groupBy : "$date",
        boundaries: weeks, //[ '20210201-20210215', '20210216-20210228', '20210301-20210315', '20210316-20210331', '9' ],
        default: 'error',
        output: {
            // _id: automatically assigned with the corresponded boundaries value
            expense: { $sum: "$expense" },
            revenue: { $sum: "$revenue" },
            count: { $sum: 1 }
        }
    }
} )

const groupGenre = {
    $group: {
        _id : "$genre_id",
        genre_id : { $first: "$genre_id" },
        expense: { $sum: "$expense" },
        revenue: { $sum: "$revenue" },
        count: { $sum: 1 }
    }
}

const groupFund = {
    $group: {
        _id : "$fund_id",
        fund_id : { $first: "$fund_id" },
        expense: { $sum: "$expense" },
        revenue: { $sum: "$revenue" },
        count: { $sum: 1 }
    }
}

const lookupGenre = {
    $lookup: {
        from: 'payment_genres', 
        localField: 'genre_id', 
        foreignField: '_id', 
        as: 'genre_'
    }
}

const lookupFund = {
    $lookup: {
        from: 'payment_funds', 
        localField: 'fund_id', 
        foreignField: '_id', 
        as: 'fund_'
    }
}

const sortMonth = {
    $sort: { month: 1 }
}

const sortWeek = {
    $sort: { week: 1 }
}

const sortGenre = {
    $sort: { genre_code: 1 }
}

const sortFund = {
    $sort: { fund_code: 1 }
}

export {
    matchPayments,
    convertFieldTo,
    reduceField,
    groupMonth,
    groupWeek,
    groupGenre,
    groupFund,
    lookupGenre,
    lookupFund,
    sortMonth,
    sortWeek,
    sortGenre,
    sortFund,
}