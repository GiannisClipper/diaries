import React from 'react';

import { InputBox, InputLabel, InputValue } from '../libs/InputBox';

function NoteForm( { data, setData, lexicon } ) {

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
                    value={ data.note || '' }
                    onChange={event => setData( { ...data, note: event.target.value } )}
                />
            </InputValue>
        </InputBox>
    );
}

export default NoteForm;
