import React from 'react';

const NoteRepr = ( { entry } ) => {

    let { note } = entry.type_specs;

    let repr = note;

    return <>{ repr }</>
}

export default NoteRepr;
export { NoteRepr };