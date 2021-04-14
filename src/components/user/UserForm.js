import React, { useState } from 'react';

import { Modal } from '../commons/Modal';
import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputEmail } from '../commons/InputEmail';
import { InputFromListSelecting } from '../commons/InputFromList';

import CoreForm from "../core/CoreForm";
import validators from '../core/assets/validators';
import presetAction from '../core/helpers/presetAction';
import withLexicon from '../core/helpers/withLexicon';
import { getFromList } from '../core/helpers/getFromList';

import { UsersContext } from './UsersContext';

function UserForm( { users, index, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const user = users[ index ];
    const { _uiux } = user;

    const [ data, setData ] = useState( { ...user } );

    const types = [
        { type: 'admin', descr: lexicon.user.types.admin },
        { type: 'user', descr: lexicon.user.types.user },
    ];

    const onValidation = () => {
        let errors = [];

        const isBlank = withLexicon( validators.isBlank, lexicon );
        const isFound = withLexicon( validators.isFound, lexicon );
        const isNotFound = withLexicon( validators.isNotFound, lexicon );

        errors.push( isBlank( lexicon.user.username, data.username ) );
        errors.push( isFound( lexicon.user.username, users.map( x=> x.title ), data.username, index ) );

        if ( _uiux.mode.isCreate ) {
            errors.push( isBlank( lexicon.user.password, data.password ) );
        }

        if ( data.password ) {
            errors.push( isNotFound( lexicon.user.password2, [ data.password ], data.password2 ) );
        }

        errors = errors.filter( x => x !== null );

        return { data, errors };
    }

    return (
        <Modal onClick={ onClickOut } centeredness>

            <CoreForm
                headLabel={ lexicon.user.user }
                Context={ UsersContext }
                assets={ assets }
                lexicon={ lexicon }
                index={ index }
                onValidation={ onValidation }
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
                        { lexicon.user.username }
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
                        { lexicon.user.password }
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
                        { lexicon.user.password2 }
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
                        { lexicon.user.email }
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
                        { lexicon.user.type }
                    </InputLabel>
                    <InputValue>
                        <InputFromListSelecting
                            value={ getFromList( types, 'type', data.type ).descr }
                            values={ types.map( x => x.descr ) }
                            onChange={ event => setData( { ...data, type: getFromList( types, 'descr', event.target.value ).type } ) }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        { lexicon.user.remark }
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
