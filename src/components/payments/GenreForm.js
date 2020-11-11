import React, { useState, useEffect } from 'react';
import { Modal } from '../libs/Modal';
import { CRUDForm } from '../libs/FormBox';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputCheck } from '../libs/InputCheck';
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
        <Modal onClick={onClickCancel} centeredness>
            <CRUDForm
                mode={genre.uiux.mode}
                onClickOk={onClickOk}
                onClickCancel={onClickCancel}
                isOnRequest={genre.uiux.process.isOnRequest}
            >
                <InputBox>
                    <InputLabel>
                        Id
                    </InputLabel>
                    <InputValue>
                        <input 
                            value={data.id || ''}
                            tabIndex="-1"
                            readOnly
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Ονομασία
                    </InputLabel>
                    <InputValue>
                        <input
                            value={data.name}
                            onChange={event => setData( { ...data, name: event.target.value } )}
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Εγγραφές
                    </InputLabel>
                    <InputValue>
                        <InputCheck
                            checked={data.isIncoming}
                            onChange={event => setData( { ...data, isIncoming: event.target.checked } )}
                            label='Εισπράξεων'
                        />
                        <InputCheck
                            checked={data.isOutgoing}
                            onChange={event => setData( { ...data, isOutgoing: event.target.checked } )}
                            label='Πληρωμών'
                        />                        
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Λογ.Κωδικ.
                    </InputLabel>
                    <InputValue>
                        <input
                            value={data.code}
                            onChange={event => setData( { ...data, code: event.target.value } )}
                        />
                    </InputValue>
                </InputBox>

            </CRUDForm>
        </Modal>
    );
}

export default GenreForm;
