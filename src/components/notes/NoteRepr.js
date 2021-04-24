import React from 'react';

const NoteRepr = ( { entry } ) => {

    let { note } = entry.type_specs;

    let repr = note.substring( 0, 100 );

    repr += repr === note ? '' : '...';

    return <>{ repr }</>
}

export default NoteRepr;
export { NoteRepr };