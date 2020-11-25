import React, { useState } from 'react';
import EntryForm from '../EntryForm';
import { heads } from '../../storage/texts';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputValidations } from "../libs/CRUD";
import { isBlank } from '../../helpers/validation';

function NoteForm( { date, entry } ) {

    const [ data, setData ] = useState( { ...entry.data } );

    const doValidate = () => {
        let errors = '';
        errors += isBlank( data.note ) ? 'Το Σημείωμα δεν μπορεί να είναι κενό.\n' : '';
        return { data, errors };
    }

    return (
        <EntryForm
            headLabel={heads.notes}
            id={data.id}
            date={date}
            entry={entry}
        >

            <InputValidations
                process={entry.uiux.process}
                doValidate={doValidate}
            />

            <InputBox>
                <InputLabel>
                    Σημείωμα
                </InputLabel>
                <InputValue>
                    <textarea
                        rows="10"
                        cols="50"
                        maxLength="1000"
                        value={data.note}
                        onChange={event => setData( { ...data, note: event.target.value } )}
                    />
                </InputValue>
            </InputBox>

        </EntryForm>
    );
}

export default NoteForm;
