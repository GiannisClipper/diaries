import React, { useEffect } from 'react';
import '../styles/EntryForm.css';
import { dayNames } from '../helpers/dates';
import { Modal } from './libs/Modal';
import { CRUDForm, Field } from './libs/Form';
import { isBlank } from '../helpers/validation';

function EntryForm( { className, date, entry, inSequence, data, closeForm, doValidation, validationDone, validationError, doRequest, children } ) {

    const dateInfo = (
        dayNames[ date.getDay() ] + ' ' +
        date.getDate().toString().padStart( 2, '0' ) + '-' +
        ( date.getMonth() + 1 ).toString().padStart( 2, '0' ) + '-' +
        date.getFullYear()
    );

    const onClickOk = event => {
        entry.data = { ...data };
        doValidation( date, inSequence );
        entry.uiux.mode.isCreate || entry.uiux.mode.isUpdate
            ? doValidation( date, inSequence )
            : doRequest( date, inSequence )
    }

    const onClickCancel = event => closeForm( event, date, inSequence );

    useEffect( () => {
    
        if ( entry.uiux.process.isOnValidation ) {

            let errors = '';
            errors += isBlank( data.note ) ? 'Το Σημείωμα δεν μπορεί να είναι κενό.\n' : '';

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
        <Modal>
            <CRUDForm
                className={className}
                mode={entry.uiux.mode}
                onClickOk={onClickOk}
                onClickCancel={onClickCancel}
                isOnRequest={entry.uiux.process.isOnRequest}
            >
                <Field className="id" label="Id">
                    <input 
                        value={data.id}
                        tabIndex="-1"
                        readOnly
                    />
                </Field>

                <Field className="date" label="Ημ/νία">
                    <input 
                        value={dateInfo}
                        tabIndex="-1"
                        readOnly
                    />
                </Field>

                {children}

            </CRUDForm>
        </Modal>
    );
}

export default EntryForm;
