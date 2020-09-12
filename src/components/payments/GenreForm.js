import React, { useState } from 'react';
import '../../styles/payments/GenreForm.css';
import { Modal } from '../libs/Modal';
import { CRUDForm, Field } from '../libs/Form';

function GenreForm( { genre, index, closeForm, doRequest } ) {

    let className = 'payments GenreForm';

    const [ data, setData ] = useState( { ...genre.data } );
    //const changes = Object.keys( data ).filter( x => data[ x ] !== genre.data[ x ] );

    const onClickOk = event => {
        genre.data = { ...data };
        doRequest( genre, index );
    }

    const onClickCancel = closeForm;

    return (
        <Modal>
            <CRUDForm
                className={className}
                mode={genre.uiux.mode}
                onClickOk={onClickOk}
                onClickCancel={onClickCancel}
                isOnRequest={genre.uiux.db.isOnRequest}

            >
                <Field className="id" label="Id">
                    <input 
                        value={data.id}
                        tabIndex="-1"
                        readOnly
                    />
                </Field>

                <Field className="name" label="Ονομασία">
                    <input
                        value={data.name}
                        onChange={event => setData( { ...data, name: event.target.value } )}
                    />
                </Field>

                <Field className="is" label="Εγγραφές">
                    <div className="isIncoming">
                        <input 
                            type="checkbox" 
                            checked={data.isIncoming}
                            onChange={event => setData( { ...data, isIncoming: event.target.checked } )}
                        />
                        Εισπράξεων
                    </div>
 
                    <div className="isOutgoing">
                        <input 
                            type="checkbox" 
                            checked={data.isOutgoing}
                            onChange={event => setData( { ...data, isOutgoing: event.target.checked } )}
                        />
                        Πληρωμών
                    </div>
                </Field>

                <Field className="code" label="Λογ.Κωδικ.">
                    <input
                        value={data.code}
                        onChange={event => setData( { ...data, code: event.target.value } )}
                    />
                </Field>

            </CRUDForm>
        </Modal>
    );
}

export default GenreForm;
