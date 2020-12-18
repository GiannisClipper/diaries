import React, { useContext, useState, useEffect  } from 'react';
import { STATEContext } from './STATEContext';
import { realFetch, mockFetch } from '../helpers/customFetch';
import { parseSigninToDB } from '../storage/parsers';
import { heads } from '../storage/texts';
import { ListBox } from './libs/ListBox';
import { HeadBox } from './libs/HeadBox';
import { InputBox, InputLabel, InputValue } from './libs/InputBox';
import { ButtonBox, ButtonLabel, ButtonValue } from './libs/ButtonBox';
import { OkButton } from './libs/Buttons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
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

    const validationOk = payload => {
        STATE.dispatch( { 
            namespace,
            type: 'VALIDATION_OK',
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

    const signinResponseOk = dataFromDB => {
        STATE.dispatch( { 
            namespace,
            type: 'SIGNIN_RESPONSE_OK',
            payload: { ...dataFromDB },
        } );
    }

    const signinResponseError = () => {
        STATE.dispatch( { 
            namespace,
            type: 'SIGNIN_RESPONSE_ERROR',
            payload: {},
        } );
    }

    const onClickOk = event => {
        doValidation( data )
    }

    useEffect( () => {

        if ( signin.uiux.process.isValidation ) {

            let errors = '';
            errors += isBlank( data.username ) ? 'Το Όνομα χρήστη δεν μπορεί να είναι κενό.\n' : '';
            errors += isBlank( data.password ) ? 'Ο Κωδικός εισόδου δεν μπορεί να είναι κενός.\n' : '';

            if ( errors === '' ) {
                validationOk( data )

            } else {
                alert( errors );
                validationError( data );
            }

        } else if ( signin.uiux.process.isValidationOk ) {
            doRequest( data );

        } else if ( signin.uiux.process.isRequest ) {

            const doFetch = ( url, args, onDone, onError, dataFromDB ) => {
                console.log( 'Requesting... ', 'signin', data.username )

                realFetch( url, args )
                .then( res => {
                    //alert( JSON.stringify( res ) );
                    if ( !res.token ) {
                        throw new Error( 'Τα στοιχεία εισόδου είναι λανθασμένα.' ); 
                    }
                    onDone( res );
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
            const onDone = signinResponseOk;
            const onError = signinResponseError;
            doFetch( url, args, onDone, onError );
        }

    } );

    return ( 
        <AuthList>
            <HeadBox>
                {heads.app}
            </HeadBox>
            <InputBox>
                <InputLabel>
                    Όνομα
                </InputLabel>
                <InputValue>
                    <input
                        value={data.username}
                        onChange={event => setData( { ...data, username: event.target.value ? event.target.value : '' } )}
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
                        onChange={event => setData( { ...data, password: event.target.value ? event.target.value : '' } )}
                    />
                </InputValue>
            </InputBox>

            <ButtonBox>
                <ButtonLabel />
                <ButtonValue>
                    <OkButton
                        icon={faDoorOpen}
                        label='Είσοδος' 
                        onClick={onClickOk} 
                        isRequest={signin.uiux.process.isRequest}
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

    return null
}

export { Signin, Signout };