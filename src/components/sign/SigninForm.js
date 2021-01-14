import React, { useContext, useState, useEffect } from 'react';

import { AppContext } from '../app/AppContext';
import { InputValidation } from '../core/CoreForm';

import styled from 'styled-components';
import { ListBox } from '../libs/ListBox';
import { HeadBox } from '../libs/HeadBox';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { ButtonBox, ButtonLabel, ButtonValue } from '../libs/ButtonBox';
import { OkButton } from '../libs/Buttons';
import texts from '../../storage/texts';
import { isBlank } from '../../helpers/validation';

const SignList = styled( ListBox )`
    width: 30em;
    height: 100%;
    padding: 1em;
    ${ props => props.theme.AppHeader && props.theme.AppHeader };
`;

function SignForm( { status } ) {

    const { state, actions, assets } = useContext( AppContext );

    const validation = payload => actions.validation( { ...payload, assets: assets.signin } );
    const validationOk = payload => actions.validationOk( { ...payload, assets: assets.signin } );
    const validationError = payload => actions.validationError( { ...payload, assets: assets.signin } );
    const signinRequest = payload => actions.signinRequest( { ...payload, assets: assets.signin } );

    const { signin } = state;

    const [ data, setData ] = useState( { ...signin } );

    const validationRules = () => {
        let errors = '';
 
        errors += isBlank( data.username )
            ? 'Το Όνομα χρήστη δεν μπορεί να είναι κενό.\n' : '';
 
        errors += isBlank( data.password )
            ? 'Ο Κωδικός εισόδου δεν μπορεί να είναι κενός.\n' : '';
  
        return { data, errors };
    }

    const headLabel = texts.heads.app;

    const okLabel = texts.buttons.signin;

    const onClickOk = ! validationRules ? signinRequest : validation;

    return (
        <SignList>
            <HeadBox>
                { headLabel }
            </HeadBox>

            <InputValidation
                status={ status }
                validationRules={ validationRules }
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