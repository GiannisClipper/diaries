const matchWorkouts = ( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } ) => {

    const filters = { 
        diary_id,
        type,
        date: { 
            $gte: dateFrom, 
            $lte: dateTill
        },
    }

    if ( genre_ids ) {
        filters[ 'type_specs.genre_id' ] = { $in: genre_ids };

    } else if ( genre_id ) {
        filters[ 'type_specs.genre_id' ] = genre_id;
    }

    if ( equip_ids ) {
        filters[ 'type_specs.equip_id' ] = { $in: equip_ids };
    
    } else if ( equip_id ) {
        filters[ 'type_specs.equip_id' ] = equip_id;
    }

    return { 
        $match: filters
    };
};

const groupMonth = {
    $group: {
        _id : "$month",
        month : { $first: "$month" },
        distance: { $sum: "$distance" },
        duration: { $push: "$duration" },
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
            distance: { $sum: "$distance" },
            duration: { $push: "$duration" },
            count: { $sum: 1 }
        }
    }
} )

const groupGenre = {
    $group: {
        _id : "$genre_id",
        genre_id : { $first: "$genre_id" },
        distance: { $sum: "$distance" },
        duration: { $push: "$duration" },
        count: { $sum: 1 }
    }
}

const groupEquip = {
    $group: {
        _id : "$equip_id",
        equip_id : { $first: "$equip_id" },
        distance: { $sum: "$distance" },
        duration: { $push: "$duration" },
        count: { $sum: 1 }
    }
}

const lookupGenre = {
    $lookup: {
        from: 'workout_genres', 
        localField: 'genre_id', 
        foreignField: '_id', 
        as: 'genre_'
    }
}

const lookupEquip = {
    $lookup: {
        from: 'workout_equips', 
        localField: 'equip_id', 
        foreignField: '_id', 
        as: 'equip_'
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

const sortEquip = {
    $sort: { equip_code: 1 }
}

export {
    matchWorkouts,
    groupMonth,
    groupWeek,
    groupGenre,
    groupEquip,
    lookupGenre,
    lookupEquip,
    sortMonth,
    sortWeek,
    sortGenre,
    sortEquip,
}