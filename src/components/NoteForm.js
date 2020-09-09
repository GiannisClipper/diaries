import React, { useState } from 'react';
import '../styles/NoteForm.css';
import EntryForm from './EntryForm';
import { Field } from './libs/Form';

function NoteForm( { date, entry, inSequence } ) {

    const className = 'NoteForm';

    const [ data, setData ] = useState( { ...entry.data } );

    return (
        <EntryForm
            className={className}
            date={date}
            entry={entry}
            inSequence={inSequence}
            data={data}
        >
            <Field className="note" label="Σημείωμα">
                <textarea
                    rows="10"
                    cols="50"
                    maxLength="1000"
                    value={data.note}
                    onChange={event => setData( { ...data, note: event.target.value } )}
                />
            </Field>
        </EntryForm>
    );
}

export default NoteForm;
