import React, { createContext, useCallback, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ListBox } from '../libs/ListBox';
import { HeadBox } from '../libs/HeadBox';
import { ButtonBox, ButtonLabel, ButtonValue } from '../libs/ButtonBox';
import { OkButton } from '../libs/Buttons';
import texts from '../../storage/texts';
import { doFetch } from '../../helpers/customFetch';

const SignContext = createContext();

const SignContextProvider = React.memo( ( { dispatch, namespace, payload, children } ) => {

    payload = payload || '{}';

    const actions = {
        doValidation: useCallback(
            payload2 => dispatch( { namespace, type: 'DO_VALIDATION', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        validationOk: useCallback(
            payload2 => dispatch( { namespace, type: 'VALIDATION_OK', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        validationError: useCallback(
            payload2 => dispatch( { namespace, type: 'VALIDATION_ERROR', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        doRequest: useCallback(
            payload2 => dispatch( { namespace, type: 'DO_REQUEST', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ),
        signupResponseOk: useCallback(
            payload2 => dispatch( { namespace, type: 'SIGNUP_RESPONSE_OK', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        signupResponseError: useCallback(
            payload2 => dispatch( { namespace, type: 'SIGNUP_RESPONSE_ERROR', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ),
        signinResponseOk: useCallback(
            payload2 => dispatch( { namespace, type: 'SIGNIN_RESPONSE_OK', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        signinResponseError: useCallback(
            payload2 => dispatch( { namespace, type: 'SIGNIN_RESPONSE_ERROR', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ),
    }

    //useEffect( () => console.log( 'Has rendered. ', 'SignContextProvider' ) );

    return (
        <SignContext.Provider value={ { ...actions } }>
            { children }
        </SignContext.Provider>
    )
} );

const SignList = styled( ListBox )`
    width: 30em;
    height: 100%;
    padding: 1em;
    ${props => props.theme.AppHeader && props.theme.AppHeader};
`;

function SignForm( { headLabel, mode, process, validation, children } ) {

    const { doValidation, doRequest } = useContext( SignContext );

    const okLabel = ( 
        mode.isSignup ?
            texts.buttons.signup :
        mode.isSignin ?
            texts.buttons.signin :
        null
    );

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

            { children }

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

function InputValidation( { process, validation }) {

    const { validationOk, validationError, doRequest } = useContext( SignContext );

    useEffect( () => {
    
        if ( process.isValidation ) {
            const { data, errors } = validation();

            if ( errors === '' ) {
                validationOk( { data } )

            } else {
                alert( errors );
                validationError();
            }

        } else if ( process.isValidationOk ) {
            doRequest();
        }
    } );

    return null;
}

function SigninRequest( { process, url, body, dataToDB }) {

    const { signinResponseOk, signinResponseError } = useContext( SignContext );

    useEffect( () => {
        if ( process.isRequest ) {
            const args = { method: 'POST', body };
            const onDone = signinResponseOk;
            const onError = signinResponseError;
            const dataFromDB = res => res;
            doFetch( url, args, onDone, onError, dataFromDB );
        }
    } );

    return null;
}

export { 
    SignContext,
    SignContextProvider,
    SignForm,
    SigninRequest,
}