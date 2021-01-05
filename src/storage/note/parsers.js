const parseNoteFromDB = data => ( {
    id: data._id,
    date: data.date,
    index: data.index,
    type: data.type,
    note: data.note,
} )

const parseNoteToDB = data => ( {
    date: data.date,
    index: data.index,
    type: data.type,
    note: data.note,
} )

export { parseNoteFromDB, parseNoteToDB };
