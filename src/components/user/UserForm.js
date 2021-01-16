import React, { useState } from 'react';

import { Modal } from '../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputEmail } from '../libs/InputEmail';
import { InputCheck } from '../libs/InputCheck';

import CoreForm from "../core/CoreForm";
import { isBlank, isFound } from '../core/helpers/validation';
import prepayAction from '../core/helpers/prepayAction';

import { UsersContext } from './UsersContext';

function UserForm( { users, index, actions, assets } ) {

    const closeForm = prepayAction( actions.closeForm, { assets, index } );

    const user = users[ index ];
    const { _uiux } = user;

    const [ data, setData ] = useState( { ...user } );

    const validationRules = () => {
        let errors = '';
 
        errors += isBlank( data.username ) 
            ? 'Το Όνομα χρήστη δεν μπορεί να είναι κενό.\n' : '';
 
        errors += !isBlank( data.username ) && isFound( users.map( x => x.username ), data.username, index ) 
            ? 'Το Όνομα xρήστη υπάρχει ήδη.\n' : '';
 
        errors += isBlank( data.password ) && _uiux.mode.isCreate 
            ? 'Ο Κωδικός εισόδου δεν μπορεί να είναι κενός.\n' : '';
 
        errors += !isBlank( data.password ) && data.password !== data.password2 
            ? 'Διαφορά στην πληκτρολόγηση του Κωδικού εισόδου.\n' : '';
 
        return { data, errors };
    }

    return (
        <Modal onClick={ closeForm } centeredness>

            <CoreForm
                Context={ UsersContext }
                assets={ assets }
                index={ index }
                validationRules={ validationRules }
            >
                <InputBox>
                    <InputLabel>
                        Id
                    </InputLabel>
                    <InputValue>
                        <input 
                            value={ data.id || '' }
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
                            value={ data.username || '' }
                            onChange={ event => setData( { ...data, username: event.target.value } ) }
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
                            value={ data.password || '' }
                            onChange={ event => setData( { ...data, password: event.target.value } ) }
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
                            value={ data.password2 || '' }
                            onChange={ event => setData( { ...data, password2: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Email
                    </InputLabel>
                    <InputValue>
                        <InputEmail
                            value={ data.email || '' }
                            onChange={ event => setData( { ...data, email: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Δικαιώματα
                    </InputLabel>
                    <InputValue>
                        <InputCheck
                            checked={ data.isAdmin }
                            onChange={ event => setData( { ...data, isAdmin: event.target.checked } ) }
                            label='Διαχειριστή'
                        />
                        <InputCheck
                            checked={ data.isUser }
                            onChange={ event => setData( { ...data, isUser: event.target.checked } ) }
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
                            value={ data.remark || '' }
                            onChange={ event => setData( { ...data, remark: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

            </CoreForm>
        </Modal>
    );
}

export default UserForm;
export { UserForm };
