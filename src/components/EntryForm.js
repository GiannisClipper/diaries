import React from 'react';
import '../styles/EntryForm.css';
import { dayNames } from '../helpers/dates';
import { Modal } from './libs/Modal';
import { CRUDForm, Field } from './libs/Form';

function EntryForm( { className, date, entry, inSequence, data, doRequest, closeForm, children } ) {

    const dateInfo = (
        dayNames[ date.getDay() ] + ' ' +
        date.getDate().toString().padStart( 2, '0' ) + '-' +
        ( date.getMonth() + 1 ).toString().padStart( 2, '0' ) + '-' +
        date.getFullYear()
    );

    const onClickOk = event => {
        entry.data = { ...data };
        doRequest( date, inSequence );
    }

    const onClickCancel = event => closeForm( event, date, inSequence );

    return (
        <Modal>
            <CRUDForm
                className={className}
                mode={entry.uiux.mode}
                onClickOk={onClickOk}
                onClickCancel={onClickCancel}
                isOnRequest={entry.uiux.db.isOnRequest}
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
