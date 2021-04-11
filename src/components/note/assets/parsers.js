const parseNoteFromDB = data => {

    const { _id, diary_id, date, index, type, type_specs } = data;
    const { note } = type_specs;

    return {
        id: _id,
        diary_id,
        date,
        index,
        type,
        type_specs: {
            note
        }
    }
}

const parseNoteToDB = data => {

    const { diary_id, date, index, type, type_specs } = data;
    const { note } = type_specs;

    return {
        diary_id,
        date,
        index,
        type,
        type_specs: {
            note
        }
    }
}

export { parseNoteFromDB, parseNoteToDB };
