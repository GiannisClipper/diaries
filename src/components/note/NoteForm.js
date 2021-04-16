import React from 'react';

import { InputBox, InputLabel, InputValue } from '../commons/InputBox';

import { noteSchema } from './assets/schemas';

function NoteForm( { data, setData, lexicon } ) {

    const type_specs = data.type_specs || noteSchema();

    return (
        <InputBox>
            <InputLabel>
                { lexicon.note.note }
            </InputLabel>
            <InputValue>
                <textarea
                    rows="12"
                    maxLength="2000"
                    value={ type_specs.note || '' }
                    onChange={ event => setData( { ...data, type_specs: { ...type_specs, note: event.target.value } } ) }
                />
            </InputValue>
        </InputBox>
    );
}

export default NoteForm;
