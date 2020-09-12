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
        console.log( 'Has rendered. ', 'PaymentGenreList' );
    } );

    let index = -1;

    return (
        <div className={`payments GenreList ${className}`}>
            <ul>
                { genres.map( genre => (
                    <Genre index={++index} genre={genre} />
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

    const createRequestDone = ( index, dataFromDB ) => {
        STATE.dispatch( { 
            namespace,
            type: 'CREATE_REQUEST_DONE',
            payload: { index, dataFromDB },
        } );
    }

    const createRequestError = index => {
        STATE.dispatch( { 
            namespace,
            type: 'CREATE_REQUEST_ERROR',
            payload: { index },
        } );
    }

    const updateRequestDone = ( index, dataFromDB ) => {
        STATE.dispatch( {
            namespace, 
            type: 'UPDATE_REQUEST_DONE',
            payload: { index, dataFromDB },
        } );
    }

    const updateRequestError = index => {
        STATE.dispatch( { 
            namespace,
            type: 'UPDATE_REQUEST_ERROR',
            payload: { index, saved: REF.current.saved },
        } );
    }

    const deleteRequestDone = ( index, dataFromDB ) => {
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
        if ( genre.uiux.db.isOnRequest && Object.keys( genre.uiux.mode ).length !== 0 ) {
            console.log( 'Requesting... ', genre.uiux.mode, genre.data.id )

            const dataToDB = parseGenreToDB( genre.data );

            let url, method, idInResponse, onDone, onError;

            if ( genre.uiux.mode.isRetrieveAll ) {
                url = `/.netlify/functions/payments-genre`;
                method = 'GET';
                onDone = retrieveAllRequestDone;
                onError = retrieveAllRequestError;

                realFetch( url , { method } )
                .then( res => {
                    alert( JSON.stringify( res ) );
                    const dataFromDB = res;
                    onDone( dataFromDB );
                } )
                .catch( err => { 
                    alert( err );
                    onError();
                } );

            } else {
                if ( genre.uiux.mode.isCreate ) {
                    url = `/.netlify/functions/payments-genre`;
                    method = 'POST';
                    idInResponse = res => res.insertedId;
                    onDone = createRequestDone;
                    onError = createRequestError;    
        
                } else if ( genre.uiux.mode.isUpdate ) {
                    url = `/.netlify/functions/payments-genre?id=${genre.data.id}`;
                    method = 'PUT';
                    idInResponse = () => genre.data.id;
                    onDone = updateRequestDone;
                    onError = updateRequestError;

                } else if ( genre.uiux.mode.isDelete ) {
                    url = `/.netlify/functions/payments-genre?id=${genre.data.id}`;
                    method = 'DELETE';
                    idInResponse = () => genre.data.id;
                    onDone = deleteRequestDone;
                    onError = deleteRequestError;
                }

                realFetch( url , {
                    method: method,
                    body: JSON.stringify( { data: dataToDB } )
                } )
                .then( res => {
                    alert( JSON.stringify( res ) );
                    const dataFromDB = { ...dataToDB, _id: idInResponse( res ) };
                    onDone( index, dataFromDB );
                } )
                .catch( err => { 
                    alert( err );
                    onError( index );
                } );
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

            {genre.uiux.db.isOnRequest
                ? <Loader />
                : <GenreMenu openForm={openForm} mode={mode} />
            }

            {genre.uiux.form.isOpen ? <GenreForm genre={genre} index={index} doRequest={doRequest} closeForm={closeForm} /> : null}

        </li> 
    );
}

export default GenreList;