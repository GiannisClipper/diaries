import React, { useState } from 'react';

import { Modal } from '../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputEmail } from '../libs/InputEmail';
import { InputCheck } from '../libs/InputCheck';

import CoreForm from "../core/CoreForm";
import { isBlank, isFound, isNotFound } from '../core/assets/validators';
import prepayAction from '../core/helpers/prepayAction';

import { UsersContext } from './UsersContext';

function UserForm( { users, index, actions, assets } ) {

    const closeForm = prepayAction( actions.closeForm, { assets, index } );
    const noMode = prepayAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const user = users[ index ];
    const { _uiux } = user;

    const [ data, setData ] = useState( { ...user } );

    const validators = () => {
        let errors = [];

        errors.push( isBlank( 'Όνομα', data.username ) );
        errors.push( isFound( 'Όνομα', users.map( x=> x.title ), data.username, index ) );

        if ( _uiux.mode.isCreate ) {
            errors.push( isBlank( 'Κωδικός εισόδου', data.password ) );
        }

        if ( data.password ) {
            errors.push( isNotFound( 'Επανάληψη', [ data.password ], data.password2 ) );
        }

        errors = errors.filter( x => x !== null );

        return { data, errors };
    }

    return (
        <Modal onClick={ onClickOut } centeredness>

            <CoreForm
                Context={ UsersContext }
                assets={ assets }
                index={ index }
                validators={ validators }
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
