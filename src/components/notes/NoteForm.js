import React, { useState, useEffect } from 'react';
import EntryForm from '../EntryForm';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { isBlank } from '../../helpers/validation';
import { heads } from '../../storage/texts';

function NoteForm( { date, entry, inSequence, closeForm, doValidation, validationDone, validationError, doRequest } ) {

    const [ formData, setData ] = useState( { ...entry.data } );

    useEffect( () => {
    
        if ( entry.uiux.process.isOnValidation ) {

            let errors = '';
            errors += isBlank( formData.note ) ? 'Το Σημείωμα δεν μπορεί να είναι κενό.\n' : '';

            if ( errors === '' ) {
                validationDone( date, inSequence )

            } else {
                alert( errors );
                validationError( date, inSequence );
            }

        } else if ( entry.uiux.process.isOnValidationDone ) {
            doRequest( date, inSequence );
        }
    } );

    return (
        <EntryForm
            headLabel={heads.notes}
            date={date}
            entry={entry}
            inSequence={inSequence}
            formData={formData}
            closeForm={closeForm}
            doValidation={doValidation}
            validationDone={validationDone}
            validationError={validationError}
            doRequest={doRequest}
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
                        value={formData.note}
                        onChange={event => setData( { ...formData, note: event.target.value } )}
                    />
                </InputValue>
            </InputBox>

        </EntryForm>
    );
}

export default NoteForm;
