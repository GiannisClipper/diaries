import React, { useState } from 'react';
import EntryForm from '../entry/EntryForm';
import { heads } from '../../storage/texts';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { isBlank } from '../../helpers/validation';

function NoteForm( { date, entry } ) {

    const [ data, setData ] = useState( { ...entry } );

    const validation = () => {
        let errors = '';

        errors += isBlank( data.note ) 
            ? 'Το Σημείωμα δεν μπορεί να είναι κενό.\n' : '';
        
        return { data, errors };
    }

    return (
        <EntryForm
            headLabel={ heads.notes }
            validation={ validation }
            id={ data.id }
            date={ date}
            entry={ entry }
        >
            <InputBox>
                <InputLabel>
                    Σημείωμα
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

        </EntryForm>
    );
}

export default NoteForm;
