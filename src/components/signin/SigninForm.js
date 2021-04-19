import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { ListBox } from '../commons/ListBox';
import { HeadBox } from '../commons/HeadBox';
import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { ButtonBox, ButtonLabel, ButtonValue } from '../commons/ButtonBox';
import { OkButton } from '../commons/Buttons';

import { InputValidation } from '../core/CoreForm';
import validators from '../core/assets/validators';
import presetAction from '../core/helpers/presetAction';
import withLexicon from '../core/helpers/withLexicon';

import { APP_TITLE } from '../app/assets/constants';

const SignList = styled( ListBox )`
    width: 30em;
    height: 100%;
    padding: 1em;
    ${ props => props.theme.AppHeader && props.theme.AppHeader };
`;

function SignForm( { signin, actions, assets, lexicon } ) {

    const validation = presetAction( actions.validation, { assets } );
    const validationOk = presetAction( actions.validationOk, { assets } );
    const validationError = presetAction( actions.validationError, { assets } );
    const signinRequest = presetAction( actions.signinRequest, { assets } );

    const [ data, setData ] = useState( { ...signin } );

    const { status } = signin._uiux;

    const onValidation = () => {
        let errors = [];

        const isBlank = withLexicon( validators.isBlank, lexicon );

        errors.push( isBlank( lexicon.users.username, data.username ) );
        errors.push( isBlank( lexicon.users.password, data.password ) );

        errors = errors.filter( x => x !== null );

        return { data, errors };
     }

    const onClickOk = validation;

    return (
        <SignList>
            <HeadBox>
                { APP_TITLE }
            </HeadBox>

            <InputValidation
                status={ status }
                onValidation={ onValidation }
                validationOk={ validationOk }
                validationError={ validationError }
                request={ signinRequest }
            />

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