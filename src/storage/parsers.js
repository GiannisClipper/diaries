const parseEntryFromDB = data => ( {
    id: data._id,
    date: data.date,
    note: data.note,
    inSequence: data.inSequence
} )

const parsePaymentGenreFromDB = data => ( {
    id: data._id,
    code: data.code,
    name: data.name,
    isIncoming: data.isIncoming
} )

export { parseEntryFromDB, parsePaymentGenreFromDB };

