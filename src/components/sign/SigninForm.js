import React, { useContext, useState, useEffect } from 'react';

import { CoreContext } from '../core/CoreContext';
import { InputValidation } from '../core/CoreForm';

import { AppContext } from '../app/AppContext';

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

function SignForm( { process, children } ) {

    const { doValidation, doRequest } = useContext( CoreContext );

    const { state } = useContext( AppContext );
    const { signin } = state;

    const [ data, setData ] = useState( { ...signin } );

    const validation = () => {
        let errors = '';
 
        errors += isBlank( data.username )
            ? 'Το Όνομα χρήστη δεν μπορεί να είναι κενό.\n' : '';
 
        errors += isBlank( data.password )
            ? 'Ο Κωδικός εισόδου δεν μπορεί να είναι κενός.\n' : '';
  
        return { data, errors };
    }

    const headLabel = texts.heads.app;

    const okLabel = texts.buttons.signin;

    const onClickOk = ! validation ? doRequest : doValidation;

    return (
        <SignList>
            <HeadBox>
                { headLabel }
            </HeadBox>

            <InputValidation
                process={ process }
                validation={ validation }
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
                        value={data.password || ''}
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
                        isRequest={ process.isRequest } 
                    />
                </ButtonValue>
            </ButtonBox>

        </SignList>
    );
}

export default SignForm;
export { SignForm }