import React, { useContext, useState } from 'react';
import '../styles/EntryForm.css';
import { REFContext } from './REFContext';
import { dayNames } from '../helpers/dates';
import { Modal } from './libs/Modal';
import { Form, Field } from './libs/Form';

function EntryForm( { date, entry, inSequence } ) {

    const REF = useContext( REFContext );

    const dateInfo = (
        dayNames[ date.getDay() ] + ' ' +
        date.getDate().toString().padStart( 2, '0' ) + '-' +
        ( date.getMonth() + 1 ).toString().padStart( 2, '0' ) + '-' +
        date.getFullYear()
    );

    let className, okLabel, cancelLabel;

    className = 'EntryForm';
    okLabel = 'Επιβεβαίωση';
    cancelLabel = 'Ακύρωση';

    if ( entry.uiux.mode.isCreate ) {
        className += ' create';
        okLabel += ' νέας εγγραφής';

    } else if ( entry.uiux.mode.isUpdate ) {
        className += ' update';
        okLabel += ' τροποποίησης';

    } else if ( entry.uiux.mode.isDelete ) {
        className += ' delete';
        okLabel += ' διαγραφής';
    }

    const onClickOk = event => {
        entry.data = { ...data };
        REF.current.entryRequest( date, inSequence );
    }

    const onClickCancel = event => REF.current.closeEntryForm( event, date, inSequence );

    const [ data, setData ] = useState( { ...entry.data } );

    return (
        <Modal>
            <Form
                className={className}
                okLabel={okLabel}
                cancelLabel={cancelLabel}
                onClickOk={onClickOk}
                onClickCancel={onClickCancel}
                isOnRequest={entry.uiux.db.isOnRequest}
            >
                <Field className="id" label="Id">
                    <input 
                        value={data.id}
                        readOnly
                    />
                </Field>

                <Field className="date" label="Ημ/νία">
                    <input 
                        value={dateInfo}
                        readOnly
                    />
                </Field>

                <Field className="note" label="Σημείωμα">
                    <textarea
                        rows="10"
                        cols="50"
                        maxLength="1000"
                        value={data.note}
                        onChange={event => setData( { ...data, note: event.target.value } )}
                    />
                </Field>
            </Form>
        </Modal>
    );
}

export default EntryForm;
