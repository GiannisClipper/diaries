import React, { useContext, useState, useEffect  } from 'react';
import { STATEContext } from './STATEContext';
import { realFetch, mockFetch } from '../helpers/customFetch';
import { parseSigninToDB, parseSigninFromDB } from '../storage/parsers';
import { ListBox } from './libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from './libs/BlockBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Loader } from './libs/Loader';
import { isBlank } from '../helpers/validation';
import styled from 'styled-components';

const AuthList = styled( ListBox )`
    width: 30em;
    height: 100%;
    border: 1px dotted red;
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
            const dataFromDB = parseSigninFromDB;
            doFetch( url, args, onDone, onError, dataFromDB );

        }
    } );

    return (
        <AuthList>

            <BlockBox>
                <BlockLabel>
                    Όνομα χρήστη
                </BlockLabel>
                <BlockValue>
                    <input
                        value={data.username}
                        onChange={event => setData( { ...data, username: event.target.value } )}
                    />
                </BlockValue>
            </BlockBox>

            <BlockBox>
                <BlockLabel>
                    Κωδικός εισόδου
                </BlockLabel>
                <BlockValue>
                    <input
                        type="password"
                        value={data.password}
                        onChange={event => setData( { ...data, password: event.target.value } )}
                    />
                </BlockValue>
            </BlockBox>

            <BlockBox>
                <BlockLabel />
                <BlockValue>
                    <button className="ok" onClick={onClickOk}>
                        {signin.uiux.process.isOnRequest
                            ? <Loader /> 
                            : <FontAwesomeIcon className="icon" icon={ faCheck } />}
                        <span>Είσοδος</span>
                    </button>
                </BlockValue>
            </BlockBox>

        </AuthList>
    );
}
    
function Signout() {
    localStorage.removeItem( 'token' );
    return <></>
}

export { Signin, Signout };