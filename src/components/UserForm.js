import React, { useState, useEffect } from 'react';
import { Modal } from './libs/Modal';
import { CRUDForm } from './libs/FormBox';
import { heads } from '../storage/texts';
import { InputBox, InputLabel, InputValue } from './libs/InputBox';
import { InputEmail } from './libs/InputEmail';
import { InputCheck } from './libs/InputCheck';
import { isBlank, isFound } from '../helpers/validation';

function UserForm( { users, index, closeForm, doValidation, validationDone, validationError, doRequest } ) {
    
    const user = users[ index ];

    const [ data, setData ] = useState( { ...user.data } );
    //const changes = Object.keys( data ).filter( x => data[ x ] !== user.data[ x ] );

    const onClickOk = event => {
        user.uiux.mode.isCreate || user.uiux.mode.isUpdate
            ? doValidation( index )
            : doRequest( index )
    }

    const onClickCancel = closeForm;

    useEffect( () => {
    
        if ( user.uiux.process.isOnValidation ) {

            let errors = '';
            errors += isBlank( data.username ) ? 'Το Όνομα χρήστη δεν μπορεί να είναι κενό.\n' : '';
            errors += !isBlank( data.username ) && isFound( users.map( x=> x.data.username), data.username, index ) ? 'Το Όνομα xρήστη υπάρχει ήδη.\n' : '';
            errors += isBlank( data.password ) && user.uiux.mode.isCreate ? 'Ο Κωδικός εισόδου δεν μπορεί να είναι κενός.\n' : '';
            errors += !isBlank( data.password ) && data.password !== data.password2 ? 'Διαφορά στην πληκτρολόγηση του Κωδικού εισόδου.\n' : '';

            user.data = { ...data };

            if ( errors === '' ) {
                validationDone( index )

            } else {
                alert( errors );
                validationError( index );
            }

        } else if ( user.uiux.process.isOnValidationDone ) {
            doRequest( index );
        }
    } );

    return (
        <Modal onClick={onClickCancel} centeredness>
            <CRUDForm
                headLabel={heads.users}
                mode={user.uiux.mode}
                onClickOk={onClickOk}
                onClickCancel={onClickCancel}
                isOnRequest={user.uiux.process.isOnRequest}
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
                        Όνομα χρήστη
                    </InputLabel>
                    <InputValue>
                        <input
                            value={data.username}
                            onChange={event => setData( { ...data, username: event.target.value } )}
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Κωδικός εισόδου
                    </InputLabel>
                    <InputValue>
                        <input
                            type="password"
                            value={data.password}
                            onChange={event => setData( { ...data, password: event.target.value } )}
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Επανάληψη κωδικού
                    </InputLabel>
                    <InputValue>
                        <input
                            type="password"
                            value={data.password2}
                            onChange={event => setData( { ...data, password2: event.target.value } )}
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Email
                    </InputLabel>
                    <InputValue>
                        <InputEmail
                            value={data.email}
                            onChange={event => setData( { ...data, email: event.target.value } )}
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Δικαιώματα
                    </InputLabel>
                    <InputValue>
                        <InputCheck
                            checked={data.isAdmin}
                            onChange={event => setData( { ...data, isAdmin: event.target.checked } )}
                            label='Διαχειριστή'
                        />
                        <InputCheck
                            checked={data.isUser}
                            onChange={event => setData( { ...data, isUser: event.target.checked } )}
                            label='Απλού χρήστη'
                        />                        
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Σημειώσεις
                    </InputLabel>
                    <InputValue>
                        <input
                            value={data.remark}
                            onChange={event => setData( { ...data, remark: event.target.value } )}
                        />
                    </InputValue>
                </InputBox>

            </CRUDForm>
        </Modal>
    );
}

export default UserForm;
