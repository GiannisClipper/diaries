const parseEntryFromDB = data => ( {
    id: data._id,
    date: data.date,
    note: data.note,
    inSequence: data.inSequence
} )

export { parseEntryFromDB };

