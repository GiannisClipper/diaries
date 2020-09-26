import React, { useState, useEffect } from 'react';
import '../styles/UserForm.css';
import { Modal } from './libs/Modal';
import { CRUDForm, Field } from './libs/Form';
import { isBlank, isFound } from '../helpers/validation';

function UserForm( { users, index, closeForm, doValidation, validationDone, validationError, doRequest } ) {
    
    const user = users[ index ];

    const [ data, setData ] = useState( { ...user.data } );

    const onClickOk = event => {
        user.data = { ...data };
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
            errors += data.password !== data.password2 ? 'Διαφορά στην πληκτρολόγηση του Κωδικού εισόδου.\n' : '';

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
        <Modal>
            <CRUDForm
                className='UserForm'
                mode={user.uiux.mode}
                onClickOk={onClickOk}
                onClickCancel={onClickCancel}
                isOnRequest={user.uiux.process.isOnRequest}

            >
                <Field className="id" label="Id">
                    <input 
                        value={data.id || ''}
                        tabIndex="-1"
                        readOnly
                    />
                </Field>

                <Field className="username" label="Όνομα χρήστη">
                    <input
                        value={data.username}
                        onChange={event => setData( { ...data, username: event.target.value } )}
                    />
                </Field>

                <Field className="password" label="Κωδικός εισόδου">
                    <input
                        type="password"
                        value={data.password}
                        onChange={event => setData( { ...data, password: event.target.value } )}
                    />
                </Field>

                <Field className="password2" label="Επανάληψη κωδικού">
                    <input
                        type="password"
                        value={data.password2}
                        onChange={event => setData( { ...data, password2: event.target.value } )}
                    />
                </Field>

                <Field className="email" label="Email">
                    <input
                        value={data.email}
                        onChange={event => setData( { ...data, email: event.target.value } )}
                    />
                </Field>

                <Field className="is" label="Πρόσβαση">
                    <div className="isAdmin">
                        <input 
                            type="checkbox"
                            checked={data.isAdmin}
                            onChange={event => setData( { ...data, isAdmin: event.target.checked } )}
                        />
                        Διαχειριστής
                    </div>
 
                    <div className="isUser">
                        <input 
                            type="checkbox" 
                            checked={data.isUser}
                            onChange={event => setData( { ...data, isUser: event.target.checked } )}
                        />
                        Απλός χρήστης
                    </div>
                </Field>

                <Field className="remark" label="Σημειώσεις">
                    <input
                        value={data.remark}
                        onChange={event => setData( { ...data, remark: event.target.value } )}
                    />
                </Field>

            </CRUDForm>
        </Modal>
    );
}

export default UserForm;
