import React, { useState, useEffect } from 'react';

import { Modal } from '../commons/Modal';
import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputEmail } from '../commons/InputEmail';
import { InputSelectingList } from '../commons/InputList';

import CoreForm from "../core/CoreForm";
import { getFromList } from '../core/helpers/getFromList';
import presetAction from '../core/helpers/presetAction';
import { validationFeature } from "../core/features/validation";

import { isEmptyUsername, isEmptyPassword, isInvalidPassword } from './assets/validators';
import { UsersContext } from './UsersContext';

function UserForm( { users, index, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const user = users[ index ];
    const { _uiux } = user;

    const [ data, setData ] = useState( { ...user } );
    const { status } = user._uiux;

    const types = [
        { type: 'admin', descr: lexicon.users.types.admin },
        { type: 'user', descr: lexicon.users.types.user },
    ];

    // validation feature

    useEffect( () => {

        validationFeature( { 
            actions,
            assets,
            index,
            data,
            status,
            validationProcess: ( { data } ) => {
                const errors = [];
                errors.push( isEmptyUsername( { data } ) );
                errors.push( isEmptyPassword( { data } ) );
                errors.push( isInvalidPassword( { data } ) );
            
                return errors.filter( x => x !== null );
            }, 
        } );
    } );

    return (
        <Modal onClick={ onClickOut } centeredness>

            <CoreForm
                headLabel={ lexicon.users.user }
                Context={ UsersContext }
                assets={ assets }
                lexicon={ lexicon }
                index={ index }
                validationFeature={ true }
            >
                {/* <InputBox>
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
                </InputBox> */}

                <InputBox>
                    <InputLabel>
                        { lexicon.users.username }
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
                        { lexicon.users.password }
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
                        { lexicon.users.password2 }
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
                        { lexicon.users.email }
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
                        { lexicon.users.type }
                    </InputLabel>
                    <InputValue>
                        <InputSelectingList
                            value={ getFromList( types, 'type', data.type ).descr }
                            values={ types.map( x => x.descr ) }
                            onChange={ event => setData( { ...data, type: getFromList( types, 'descr', event.target.value ).type } ) }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        { lexicon.users.remark }
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
