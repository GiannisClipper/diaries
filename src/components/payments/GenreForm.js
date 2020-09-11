import React, { useState } from 'react';
import '../../styles/payments/GenreForm.css';
import { Modal } from '../libs/Modal';
import { Form, Field } from '../libs/Form';

function GenreForm( { genre, index } ) {

    let className = 'payments GenreForm';

    const [ data, setData ] = useState( { ...genre.data } );

    let okLabel, cancelLabel;

    okLabel = 'Επιβεβαίωση';
    cancelLabel = 'Ακύρωση';

    if ( genre.uiux.mode.isCreate ) {
        className += ' create';
        okLabel += ' νέας εγγραφής';

    } else if ( genre.uiux.mode.isUpdate ) {
        className += ' update';
        okLabel += ' τροποποίησης';

    } else if ( genre.uiux.mode.isDelete ) {
        className += ' delete';
        okLabel += ' διαγραφής';
    }

    const onClickOk = () => null;
    const onClickCancel = () => null;

    return (
        <Modal>
            <Form
                className={className}
                okLabel={okLabel}
                cancelLabel={cancelLabel}
                onClickOk={onClickOk}
                onClickCancel={onClickCancel}
                isOnRequest={genre.uiux.db.isOnRequest}

            >
                <Field className="name" label="Ονομασία">
                    <input
                        value={data.name}
                        onChange={event => setData( { ...data, name: event.target.value } )}
                    />
                </Field>

                <Field className="code" label="Κωδικός">
                    <input
                        value={data.code}
                        onChange={event => setData( { ...data, code: event.target.value } )}
                    />
                </Field>

                <Field className="isIncoming" label="Εισπράξεων">
                    <input
                        value={data.isIncoming}
                        onChange={event => setData( { ...data, isIncoming: event.target.value } )}
                    />
                </Field>

                <Field className="isOutgoing" label="Πληρωμών">
                    <input
                        value={data.isOutgoing}
                        onChange={event => setData( { ...data, isOutgoing: event.target.value } )}
                    />
                </Field>

            </Form>
        </Modal>
    );
}

export default GenreForm;
