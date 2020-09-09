import React, { useContext } from 'react';
import '../styles/EntryForm.css';
import { REFContext } from './REFContext';
import { dayNames } from '../helpers/dates';
import { Modal } from './libs/Modal';
import { Form, Field } from './libs/Form';

function EntryForm( { className, date, entry, inSequence, data, children } ) {

    const REF = useContext( REFContext );

    const dateInfo = (
        dayNames[ date.getDay() ] + ' ' +
        date.getDate().toString().padStart( 2, '0' ) + '-' +
        ( date.getMonth() + 1 ).toString().padStart( 2, '0' ) + '-' +
        date.getFullYear()
    );

    let okLabel, cancelLabel;

    className = `${className} EntryForm`;
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

                {children}

            </Form>
        </Modal>
    );
}

export default EntryForm;
