import React, { useContext, useEffect } from 'react';
import { STATEContext } from '../STATEContext';
import { realFetch, mockFetch } from '../../helpers/customFetch';

const namespace = 'payments.genres';

function GenreInit() {

    const STATE = useContext( STATEContext );

    const { init } = STATE.state.uiux;

    const initializeList = () => {
        STATE.dispatch( { 
            namespace, 
            type: 'INITIALIZE_LIST' 
        } );
    }

    const initializeListAfterRequest = () => {
        STATE.dispatch( { 
            namespace, 
            type: 'INITIALIZE_LIST_AFTER_REQUEST' 
        } );
    }
    
    const retrieveAllRequestDone = dataFromDB => {
        STATE.dispatch( { 
            namespace,
            type: 'RETRIEVE_ALL_REQUEST_DONE',
            payload: { dataFromDB },
        } );
    }

    const retrieveAllRequestError = () => {
        STATE.dispatch( { 
            namespace,
            type: 'RETRIEVE_ALL_REQUEST_ERROR',
            payload: {},
        } );
    }

    useEffect( () => {

        if ( !init.payments.genres ) {
            console.log( 'To_init_genres...' )

            initializeList();

        } else if ( init.payments.genres.isBeforeRequest ) {
            console.log( 'Requesting to init genres... ' )

            const doFetch = ( url, args, onDone, onError, dataFromDB ) => {
                realFetch( url, args )
                .then( res => {
                    alert( JSON.stringify( res ) );
                    onDone( dataFromDB( res ) );
                } )
                .catch( err => { 
                    alert( err );
                    onError();
                } );
            }

            const url = `/.netlify/functions/payments-genre`;
            const args = { method: 'GET' };
            const onDone = retrieveAllRequestDone;
            const onError = retrieveAllRequestError;
            const dataFromDB = res => res;
            doFetch( url, args, onDone, onError, dataFromDB );

            initializeListAfterRequest();
        }
    } );

    return ( <></> );
}

export default GenreInit;