import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { ListBox } from '../libs/ListBox';
import { HeadBox } from '../libs/HeadBox';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { ButtonBox, ButtonLabel, ButtonValue } from '../libs/ButtonBox';
import { OkButton } from '../libs/Buttons';

import { InputValidation } from '../core/CoreForm';
import { isBlank } from '../core/assets/validators';
import presetAction from '../core/helpers/presetAction';

import texts from '../app/assets/texts';

const SignList = styled( ListBox )`
    width: 30em;
    height: 100%;
    padding: 1em;
    ${ props => props.theme.AppHeader && props.theme.AppHeader };
`;

function SignForm( { signin, actions, assets } ) {

    const validation = presetAction( actions.validation, { assets } );
    const validationOk = presetAction( actions.validationOk, { assets } );
    const validationError = presetAction( actions.validationError, { assets } );
    const signinRequest = presetAction( actions.signinRequest, { assets } );

    const [ data, setData ] = useState( { ...signin } );

    const { status } = signin._uiux;

    const validators = () => {
        let errors = [];

        errors.push( isBlank( 'Όνομα', data.username ) );
        errors.push( isBlank( 'Κωδικός', data.password ) );

        errors = errors.filter( x => x !== null );

        return { data, errors };
     }

    const headLabel = texts.heads.app;

    const okLabel = texts.buttons.signin;

    const onClickOk = validation;

    return (
        <SignList>
            <HeadBox>
                { headLabel }
            </HeadBox>

            <InputValidation
                status={ status }
                validators={ validators }
                validationOk={ validationOk }
                validationError={ validationError }
                request={ signinRequest }
            />

            <InputBox>
                <InputLabel>
                    Όνομα
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
                    Κωδικός
                </InputLabel>
                <InputValue>
                    <input
                        type="password"
                        value={ data.password || '' }
                        onChange={ event => setData( { ...data, password: event.target.value || '' } ) }
                    />
                </InputValue>
            </InputBox>

            <ButtonBox>
                <ButtonLabel />
                <ButtonValue>
                    <OkButton 
                        label={ okLabel } 
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