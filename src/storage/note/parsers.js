const parseNoteFromDB = data => ( {
    id: data._id,
    diary_id: data.diary_id,
    date: data.date,
    index: data.index,
    type: data.type,
    note: data.note,
} )

const parseNoteToDB = data => ( {
    diary_id: data.diary_id,
    date: data.date,
    index: data.index,
    type: data.type,
    note: data.note,
} )

export { parseNoteFromDB, parseNoteToDB };
