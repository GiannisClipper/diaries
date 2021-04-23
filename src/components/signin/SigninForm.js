import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { ListBox } from '../commons/ListBox';
import { HeadBox } from '../commons/HeadBox';
import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { ButtonBox, ButtonLabel, ButtonValue } from '../commons/ButtonBox';
import { OkButton } from '../commons/Buttons';

import presetAction from '../core/helpers/presetAction';
import { validationFeature } from "../core/features/validation";
import { parseErrors } from '../core/assets/parsers';
import { ErrorsRepr } from '../core/ErrorsRepr';

import { isEmptyUsername, isEmptyPassword } from '../users/assets/validators';

import { APP_TITLE } from '../app/assets/constants';
import validation from '../core/assets/actions/validation';

const SignList = styled( ListBox )`
    width: 30em;
    height: 100%;
    padding: 1em;
    ${ props => props.theme.AppHeader && props.theme.AppHeader };
`;

function SignForm( { signin, actions, assets, lexicon } ) {

    const [ data, setData ] = useState( { ...signin } );

    const { _uiux } = signin;
    const { status } = _uiux;

    const errors = 
    ( _uiux.status.isResponseError && _uiux.error.statusCode === 422 && _uiux.error.result ) ||
    ( _uiux.status.isValidationError && _uiux.error.result )
        ? parseErrors( { lexicon, errors: _uiux.error.result } )
        : null;

    // validation feature

    useEffect( () => {

        validationFeature( { 
            actions,
            assets,
            data,
            status,
            validationProcess: ( { data } ) => {
                const errors = [];
                errors.push( isEmptyUsername( { data } ) );
                errors.push( isEmptyPassword( { data } ) );
            
                return errors.filter( x => x !== null );
            }, 
        } );

    } );

    const validation = presetAction( actions.validation, { assets } );
    const onClickOk = validation;

    return (
        <SignList>
            <HeadBox>
                { APP_TITLE }
            </HeadBox>

            <InputBox>
                <InputLabel>
                    { lexicon.users.username }
                </InputLabel>
                <InputValue>
                    <input
                        value={ data.username || '' }
                        onChange={ event => setData( { ...data, username: event.target.value || '' } ) }
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
                        onChange={ event => setData( { ...data, password: event.target.value || '' } ) }
                    />
                </InputValue>
            </InputBox>

            { errors
                ? 
                ( 
                <ButtonBox>
                    <ButtonLabel />
                    <ErrorsRepr errors={ errors } />
                </ButtonBox> 
                )
                : 
                null 
            }

            <ButtonBox>
                <ButtonLabel />
                <ButtonValue>
                    <OkButton 
                        label={ lexicon.signin.signin } 
                        onClick={ onClickOk } 
                        isRequest={ status.isRequest } 
                    />
                </ButtonValue>
            </ButtonBox>

        </SignList>
    );
}

export default SignForm;
export { SignForm }