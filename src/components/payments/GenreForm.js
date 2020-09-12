import React, { useState } from 'react';
import '../../styles/payments/GenreForm.css';
import { Modal } from '../libs/Modal';
import { CRUDForm, Field } from '../libs/Form';

function GenreForm( { genre, index } ) {

    let className = 'payments GenreForm';

    const [ data, setData ] = useState( { ...genre.data } );

    const onClickOk = () => null;
    const onClickCancel = () => null;

    return (
        <Modal>
            <CRUDForm
                className={className}
                mode={genre.uiux.mode}
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

            </CRUDForm>
        </Modal>
    );
}

export default GenreForm;
