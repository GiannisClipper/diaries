const parseNoteFromDB = data => ( {
    id: data._id,
    date: data.date,
    type: data.type,
    inSequence: data.inSequence,
    note: data.note,
} )

const parseNoteToDB = data => ( {
    date: data.date,
    type: data.type,
    inSequence: data.inSequence,
    note: data.note,
} )

export { parseNoteFromDB, parseNoteToDB };
