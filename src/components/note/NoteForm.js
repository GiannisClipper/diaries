import React from 'react';

import { InputBox, InputLabel, InputValue } from '../libs/InputBox';

function NoteForm( { data, setData, lexicon } ) {

    const { type_specs } = data;

    return (
        <InputBox>
            <InputLabel>
                { lexicon.note.note }
            </InputLabel>
            <InputValue>
                <textarea
                    rows="10"
                    cols="50"
                    maxLength="1000"
                    value={ type_specs.note || '' }
                    onChange={ event => setData( { ...data, type_specs: { ...type_specs, note: event.target.value } } ) }
                />
            </InputValue>
        </InputBox>
    );
}

export default NoteForm;
