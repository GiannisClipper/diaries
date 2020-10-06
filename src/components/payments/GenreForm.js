import React, { useState, useEffect } from 'react';
import '../../styles/payments/GenreForm.css';
import { Modal } from '../libs/Modal';
import { CRUDForm, Field } from '../libs/Form';
import { isBlank, isFound } from '../../helpers/validation';

function GenreForm( { genres, index, closeForm, doValidation, validationDone, validationError, doRequest } ) {
    
    const genre = genres[ index ];

    const [ data, setData ] = useState( { ...genre.data } );
    //const changes = Object.keys( data ).filter( x => data[ x ] !== genre.data[ x ] );

    const onClickOk = event => {
        genre.data = { ...data };
        genre.uiux.mode.isCreate || genre.uiux.mode.isUpdate
            ? doValidation( index )
            : doRequest( index )
    }

    const onClickCancel = closeForm;

    useEffect( () => {
    
        if ( genre.uiux.process.isOnValidation ) {

            let errors = '';
            errors += isBlank( data.name ) ? 'Η Ονομασία δεν μπορεί να είναι κενή.\n' : '';
            errors += !isBlank( data.name ) && isFound( genres.map( x=> x.data.name), data.name, index ) ? 'Η Ονομασία υπάρχει ήδη.\n' : '';
            errors += !isBlank( data.code ) && isFound( genres.map( x=> x.data.code), data.code, index ) ? 'Ο Λογιστικός Κωδικός υπάρχει ήδη.\n' : '';

            if ( errors === '' ) {
                validationDone( index )

            } else {
                alert( errors );
                validationError( index );
            }

        } else if ( genre.uiux.process.isOnValidationDone ) {
            doRequest( index );
        }
    } );

    return (
        <Modal className='centeredness'>
            <CRUDForm
                className='payments GenreForm'
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
