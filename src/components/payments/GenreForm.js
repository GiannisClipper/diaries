import React, { useContext, useState, useEffect } from 'react';
import '../../styles/payments/GenreForm.css';
import { STATEContext } from '../STATEContext';
import { Modal } from '../libs/Modal';
import { CRUDForm, Field } from '../libs/Form';
import { isBlank, isFound } from '../../helpers/validates';

const namespace = 'payments.genres';

function GenreForm( { genres, index, closeForm } ) {

    const genre = genres[ index ];

    let className = 'payments GenreForm';

    const STATE = useContext( STATEContext );

    const [ data, setData ] = useState( { ...genre.data } );
    //const changes = Object.keys( data ).filter( x => data[ x ] !== genre.data[ x ] );

    const doValidate = index => {
        STATE.dispatch( { 
            namespace,
            type: 'DO_VALIDATE',
            payload: { index },
        } );
    }

    const validateDone = index => {
        STATE.dispatch( { 
            namespace,
            type: 'VALIDATE_DONE',
            payload: { index },
        } );
    }

    const validateError = index => {
        STATE.dispatch( { 
            namespace,
            type: 'VALIDATE_ERROR',
            payload: { index },
        } );
    }
    const onClickOk = event => {
        genre.data = { ...data };
        doValidate( index );
    }

    const onClickCancel = closeForm;

    useEffect( () => {
        if ( genre.uiux.process.isOnValidate ) {
            let errors = '';
            errors += isBlank( data.name ) ? 'Η Ονομασία δεν μπορεί να είναι κενή.\n' : '';
            errors += !isBlank( data.name ) && isFound( genres.map( x=> x.data.name), data.name, index ) ? 'Η Ονομασία υπάρχει ήδη.\n' : '';
            errors += !isBlank( data.code ) && isFound( genres.map( x=> x.data.code), data.code, index ) ? 'Ο Λογιστικός Κωδικός υπάρχει ήδη.\n' : '';

            if ( errors === '' ) {
                validateDone( index )
            } else {
                alert( errors );
                validateError( index );
            }
        }
    } );

    return (
        <Modal>
            <CRUDForm
                className={className}
                mode={genre.uiux.mode}
                onClickOk={onClickOk}
                onClickCancel={onClickCancel}
                isOnRequest={genre.uiux.process.isOnRequest}

            >
                <Field className="id" label="Id">
                    <input 
                        value={data.id || ''}
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
