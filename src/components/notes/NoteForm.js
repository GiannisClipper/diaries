import React, { useState, useEffect } from 'react';
import EntryForm from '../EntryForm';
import { Field } from '../libs/Field';
import { isBlank } from '../../helpers/validation';

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
            <Field label="Σημείωμα">
                <textarea
                    rows="10"
                    cols="50"
                    maxLength="1000"
                    value={formData.note}
                    onChange={event => setData( { ...formData, note: event.target.value } )}
                />
            </Field>
        </EntryForm>
    );
}

export default NoteForm;
