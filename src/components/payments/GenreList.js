import React, { useRef, useContext, useEffect } from 'react';
import '../../styles/payments/GenreList.css';
import { STATEContext } from '../STATEContext';
import { REFContext } from '../REFContext';
import { realFetch, mockFetch } from '../../helpers/customFetch';
import { parseGenreToDB } from '../../storage/payments/parsers';

import { Loader } from '../libs/Loader';
import GenreMenu from './GenreMenu';
import GenreForm from './GenreForm';

const namespace = 'payments.genres';

function GenreList( { className } ) {

    const status = useRef( { isBeforeFirstRequest: true } );

    const STATE = useContext( STATEContext );

    const { genres } = STATE.state.data.payments;

    useEffect( () => {
        if ( status.current.isBeforeFirstRequest ) {
            console.log( 'add_init_genres' )
            status.current = {};
            STATE.dispatch( { namespace, type: 'INITIALIZE_LIST' } );
        }
    } );

    useEffect( () => {
        console.log( 'Has rendered. ', 'payments/GenreList' );
    } );

    let index = -1;

    return (
        <div className={`payments GenreList ${className}`}>
            <ul>
                { genres.map( genre => (
                    <Genre key={++index} index={index} genre={genre} />
                ) ) }
            </ul>
        </div>
    );
}

function Genre( { index, genre } ) {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    const openForm = mode => {
        REF.current.saved = { genre };

        STATE.dispatch( { 
            namespace,
            type: 'OPEN_FORM',
            payload: { index, mode },
        } );
    }

    const closeForm = () => {
        STATE.dispatch( { 
            namespace,
            type: 'CLOSE_FORM',
            payload: { index },
        } );
    }

    const doRequest = ( genre, index ) => {
        STATE.dispatch( { 
            namespace,
            type: 'DO_REQUEST',
            payload: { genre, index },
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

    const createRequestDone = dataFromDB => {
        STATE.dispatch( { 
            namespace,
            type: 'CREATE_REQUEST_DONE',
            payload: { index, dataFromDB },
        } );
    }

    const createRequestError = () => {
        STATE.dispatch( { 
            namespace,
            type: 'CREATE_REQUEST_ERROR',
            payload: { index },
        } );
    }

    const updateRequestDone = dataFromDB => {
        STATE.dispatch( {
            namespace, 
            type: 'UPDATE_REQUEST_DONE',
            payload: { index, dataFromDB },
        } );
    }

    const updateRequestError = () => {
        STATE.dispatch( { 
            namespace,
            type: 'UPDATE_REQUEST_ERROR',
            payload: { index, saved: REF.current.saved },
        } );
    }

    const deleteRequestDone = dataFromDB => {
        STATE.dispatch( { 
            namespace,
            type: 'DELETE_REQUEST_DONE',
            payload: { index, dataFromDB },
        } );
    }

    const deleteRequestError = () => {
        STATE.dispatch( { 
            namespace,
            type: 'DELETE_REQUEST_ERROR',
            payload: {},
        } );
    }

    useEffect( () => {
        if ( genre.uiux.process.isOnRequest ) {

            const doFetch = ( url, args, onDone, onError, dataFromDB ) => {
                console.log( 'Requesting... ', genre.uiux.mode, genre.data.id )

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

            if ( genre.uiux.mode.isCreate ) {
                const url = `/.netlify/functions/payments-genre`;
                const dataToDB = parseGenreToDB( genre.data );
                const args = { method: 'POST', body: JSON.stringify( { data: dataToDB } ) };
                const onDone = createRequestDone;
                const onError = createRequestError;
                const idInResponse = res => res.insertedId;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( url, args, onDone, onError, dataFromDB );

            } else if ( genre.uiux.mode.isRetrieveAll ) {
                const url = `/.netlify/functions/payments-genre`;
                const args = { method: 'GET' };
                const onDone = retrieveAllRequestDone;
                const onError = retrieveAllRequestError;
                const dataFromDB = res => res;
                doFetch( url, args, onDone, onError, dataFromDB );

            } else if ( genre.uiux.mode.isUpdate ) {
                const url = `/.netlify/functions/payments-genre?id=${genre.data.id}`;
                const dataToDB = parseGenreToDB( genre.data );
                const args = { method: 'PUT', body: JSON.stringify( { data: dataToDB } ) };
                const onDone = updateRequestDone;
                const onError = updateRequestError;
                const idInResponse = res => genre.data.id;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( url, args, onDone, onError, dataFromDB );

            } else if ( genre.uiux.mode.isDelete ) {
                const url = `/.netlify/functions/payments-genre?id=${genre.data.id}`;
                const dataToDB = parseGenreToDB( genre.data );
                const args = { method: 'DELETE', body: JSON.stringify( { data: dataToDB } ) };
                const onDone = deleteRequestDone;
                const onError = deleteRequestError;
                const idInResponse = () => genre.data.id;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( url, args, onDone, onError, dataFromDB );
            }
        }
    } );

    const mode = !genre.data.id ? { isCreate: true } : { isUpdate: true };

    return (
        <li 
            className={`payments Genre`}
            key={index}
        >
            <div className='data' title={`${genre.data.id}`}>
                {`${genre.data.isIncoming ? 'Ε' : 'Π'} ${genre.data.code} ${genre.data.name}`}
            </div>

            {genre.uiux.process.isOnRequest
                ? <Loader />
                : <GenreMenu openForm={openForm} mode={mode} />
            }

            {genre.uiux.form.isOpen ? <GenreForm genre={genre} index={index} doRequest={doRequest} closeForm={closeForm} /> : null}

        </li> 
    );
}

export default GenreList;