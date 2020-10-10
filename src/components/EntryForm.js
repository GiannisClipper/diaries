import React from 'react';
import { dayNames } from '../helpers/dates';
import { Modal } from './libs/Modal';
import { CRUDForm } from './libs/Form';
import { Field } from './libs/Field';

function EntryForm( { 
        date, 
        entry, 
        inSequence, 
        formData, 
        closeForm, 
        doValidation, 
        doRequest, 
        children 
    } ) {

    const dateInfo = (
        dayNames[ date.getDay() ] + ' ' +
        date.getDate().toString().padStart( 2, '0' ) + '-' +
        ( date.getMonth() + 1 ).toString().padStart( 2, '0' ) + '-' +
        date.getFullYear()
    );

    const onClickOk = event => {
        entry.data = { ...formData };
        doValidation( date, inSequence );
        entry.uiux.mode.isCreate || entry.uiux.mode.isUpdate
            ? doValidation( date, inSequence )
            : doRequest( date, inSequence )
    }

    const onClickCancel = event => closeForm( event, date, inSequence );

    return (
        <Modal centeredness>
            <CRUDForm
                mode={entry.uiux.mode}
                onClickOk={onClickOk}
                onClickCancel={onClickCancel}
                isOnRequest={entry.uiux.process.isOnRequest}
            >
                <Field label="Id">
                    <input 
                        value={formData.id || ''}
                        tabIndex="-1"
                        readOnly
                    />
                </Field>

                <Field label="Ημ/νία">
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
