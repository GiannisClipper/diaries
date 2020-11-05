import React, { useContext, useState, useEffect  } from 'react';
import { STATEContext } from './STATEContext';
import { realFetch, mockFetch } from '../helpers/customFetch';
import { parseSigninToDB, parseSigninFromDB, parseSettingsFromDB } from '../storage/parsers';
import { ListBox } from './libs/ListBox';
import { InputBox, InputLabel, InputValue } from './libs/InputBox';
import { ButtonBox, ButtonLabel, ButtonValue } from './libs/ButtonBox';
import { OkButton } from './libs/Buttons';
import { isBlank } from '../helpers/validation';
import styled from 'styled-components';

const AuthList = styled( ListBox )`
    width: 30em;
    height: 100%;
    padding: 1em;
    ${props => props.theme.AppHeader && props.theme.AppHeader };
`;

const namespace = 'auth';

function Signin() {

    const STATE = useContext( STATEContext );

    const { signin } = STATE.state.data;

    const [ data, setData ] = useState( { username: null, password: null } );

    const doValidation = payload => {
        STATE.dispatch( { 
            namespace,
            type: 'DO_VALIDATION',
            payload: payload,
        } );
    }

    const validationDone = payload => {
        STATE.dispatch( { 
            namespace,
            type: 'VALIDATION_DONE',
            payload: payload,
        } );
    }

    const validationError = payload => {
        STATE.dispatch( { 
            namespace,
            type: 'VALIDATION_ERROR',
            payload: payload,
        } );
    }

    const doRequest = payload => {
        STATE.dispatch( { 
            namespace,
            type: 'DO_REQUEST',
            payload: payload,
        } );
    }

    const signinRequestDone = dataFromDB => {
        STATE.dispatch( { 
            namespace,
            type: 'SIGNIN_REQUEST_DONE',
            payload: { ...dataFromDB },
        } );
    }

    const signinRequestError = () => {
        STATE.dispatch( { 
            namespace,
            type: 'SIGNIN_REQUEST_ERROR',
            payload: {},
        } );
    }

    const onClickOk = event => {
        doValidation( data )
    }

    useEffect( () => {

        if ( signin.uiux.process.isOnValidation ) {

            let errors = '';
            errors += isBlank( data.username ) ? 'Το Όνομα χρήστη δεν μπορεί να είναι κενό.\n' : '';
            errors += isBlank( data.password ) ? 'Ο Κωδικός εισόδου δεν μπορεί να είναι κενός.\n' : '';

            if ( errors === '' ) {
                validationDone( data )

            } else {
                alert( errors );
                validationError( data );
            }

        } else if ( signin.uiux.process.isOnValidationDone ) {
            doRequest( data );

        } else if ( signin.uiux.process.isOnRequest ) {

            const doFetch = ( url, args, onDone, onError, dataFromDB ) => {
                console.log( 'Requesting... ', 'signin', data.username )

                realFetch( url, args )
                .then( res => {
                    //alert( JSON.stringify( res ) );
                    if ( !res.token ) {
                        throw new Error( 'Τα στοιχεία εισόδου είναι λανθασμένα.' ); 
                    }
                    onDone( dataFromDB( res ) );
                } )
                .catch( err => { 
                    alert( err );
                    onError();
                } );
            }

            const dataToDB = parseSigninToDB( data );
            const body = JSON.stringify( { data: dataToDB } );

            const url = `/.netlify/functions/signin`;
            const args = { method: 'POST', body };
            const onDone = signinRequestDone;
            const onError = signinRequestError;
            const dataFromDB = data => ( { ...parseSigninFromDB( data ), ...parseSettingsFromDB( data ) } );
            doFetch( url, args, onDone, onError, dataFromDB );
        }

    } );

    return ( 
        <AuthList>
            <InputBox>
                <InputLabel>
                    Όνομα
                </InputLabel>
                <InputValue>
                    <input
                        value={data.username}
                        onChange={event => setData( { ...data, username: event.target.value } )}
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
                        value={data.password}
                        onChange={event => setData( { ...data, password: event.target.value } )}
                    />
                </InputValue>
            </InputBox>

            <ButtonBox>
                <ButtonLabel />
                <ButtonValue>
                    <OkButton 
                        label='Είσοδος' 
                        onClick={onClickOk} 
                        isOnRequest={signin.uiux.process.isOnRequest}
                    />
                </ButtonValue>
            </ButtonBox>
        </AuthList>
    );
}
    
function Signout() {

    const STATE = useContext( STATEContext );

    const doSignout = () => {
        STATE.dispatch( { 
            namespace,
            type: 'DO_SIGNOUT',
            payload: {},
        } );
    }

    useEffect( () => {
        doSignout();
    } );

    return <></>
}

export { Signin, Signout };