import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { ListBox } from '../libs/ListBox';
import { HeadBox } from '../libs/HeadBox';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { ButtonBox, ButtonLabel, ButtonValue } from '../libs/ButtonBox';
import { OkButton } from '../libs/Buttons';

import { InputValidation } from '../core/CoreForm';
import { isBlank } from '../core/assets/validators';
import prepayAction from '../core/helpers/prepayAction';

import texts from '../app/assets/texts';

const SignList = styled( ListBox )`
    width: 30em;
    height: 100%;
    padding: 1em;
    ${ props => props.theme.AppHeader && props.theme.AppHeader };
`;

function SignForm( { signin, actions, assets } ) {

    const validation = prepayAction( actions.validation, { assets } );
    const validationOk = prepayAction( actions.validationOk, { assets } );
    const validationError = prepayAction( actions.validationError, { assets } );
    const signinRequest = prepayAction( actions.signinRequest, { assets } );

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

    const onClickOk = validators ? validation : signinRequest;

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