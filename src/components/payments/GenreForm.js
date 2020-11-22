import React, { useState, useContext } from 'react';
import { Modal } from '../libs/Modal';
import { CRUDContext, CRUDForm, InputValidations } from "../libs/CRUD";
import { heads } from '../../storage/texts';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputCheck } from '../libs/InputCheck';
import { isBlank, isFound } from '../../helpers/validation';

function GenreForm( { genres, index } ) {
    
    const genre = genres[ index ];

    const [ data, setData ] = useState( { ...genre.data } );

    const { closeForm } = useContext( CRUDContext );

    const doValidate = () => {
        let errors = '';
        errors += isBlank( data.name ) ? 'Η Ονομασία δεν μπορεί να είναι κενή.\n' : '';
        errors += !isBlank( data.name ) && isFound( genres.map( x=> x.data.name), data.name, index ) ? 'Η Ονομασία υπάρχει ήδη.\n' : '';
        errors += !isBlank( data.code ) && isFound( genres.map( x=> x.data.code), data.code, index ) ? 'Ο Λογιστικός Κωδικός υπάρχει ήδη.\n' : '';
        return { data, errors };
    }

    return (
        <Modal onClick={closeForm} centeredness>

            <InputValidations
                process={genre.uiux.process}
                doValidate={doValidate}
            />

            <CRUDForm
                headLabel={heads.payment_genres}
                mode={genre.uiux.mode}
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
