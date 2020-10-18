import React, { useContext, useEffect } from 'react';
import { STATEContext } from '../STATEContext';
import { REFContext } from '../REFContext';
import { realFetch, mockFetch } from '../../helpers/customFetch';
import { parseGenreToDB } from '../../storage/payments/parsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '../libs/Loader';
import { RowBox, RowValue, RowMenu } from '../libs/RowBox';
import GenreInit from './GenreInit';
import GenreMenu from './GenreMenu';
import GenreForm from './GenreForm';

const namespace = 'payments.genres';

function GenreList() {

    const STATE = useContext( STATEContext );

    const { genres } = STATE.state.data.payments;

    useEffect( () => {
        console.log( 'Has rendered. ', 'payments/GenreList' );
    } );

    let index = -1;

    return (
        <ul>
            <GenreInit />
            { genres.map( genre => (
                <Genre key={++index} index={index} genres={genres} />
            ) ) }
        </ul>
    );
}

function Genre( { index, genres } ) {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    const genre = genres[ index ];

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

    const doValidation = index => {
        STATE.dispatch( { 
            namespace,
            type: 'DO_VALIDATION',
            payload: { index },
        } );
    }

    const validationDone = index => {
        STATE.dispatch( { 
            namespace,
            type: 'VALIDATION_DONE',
            payload: { index },
        } );
    }

    const validationError = index => {
        STATE.dispatch( { 
            namespace,
            type: 'VALIDATION_ERROR',
            payload: { index },
        } );
    }

    const doRequest = index => {
        STATE.dispatch( { 
            namespace,
            type: 'DO_REQUEST',
            payload: { index },
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

            const dataToDB = parseGenreToDB( genre.data );
            const body = JSON.stringify( { data: dataToDB } );
        
            if ( genre.uiux.mode.isCreate ) {
                const url = `/.netlify/functions/payments-genre`;
                const args = { method: 'POST', body };
                const onDone = createRequestDone;
                const onError = createRequestError;
                const idInResponse = res => res.insertedId;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( url, args, onDone, onError, dataFromDB );

            } else if ( genre.uiux.mode.isUpdate ) {
                const url = `/.netlify/functions/payments-genre?id=${genre.data.id}`;
                const args = { method: 'PUT', body };
                const onDone = updateRequestDone;
                const onError = updateRequestError;
                const idInResponse = res => genre.data.id;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( url, args, onDone, onError, dataFromDB );

            } else if ( genre.uiux.mode.isDelete ) {
                const url = `/.netlify/functions/payments-genre?id=${genre.data.id}`;
                const args = { method: 'DELETE', body };
                const onDone = deleteRequestDone;
                const onError = deleteRequestError;
                const idInResponse = () => genre.data.id;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( url, args, onDone, onError, dataFromDB );
            }
        }
    } );

    const mode = !genre.data.id ? { isCreate: true } : { isUpdate: true };

    const typeInfo = mode.isCreate
        ? ''
        : genre.data.isIncoming && genre.data.isOutgoing
        ? 'Μ'
        : genre.data.isIncoming
        ? 'Ε'
        : genre.data.isOutgoing
        ? 'Π'
        : '-';

    return (
        <RowBox key={index}>
            <RowValue title={`${genre.data.id}`}>
                <span>{`${typeInfo}${genre.data.code}`}</span>
                <span>{genre.data.name}</span>
            </RowValue>

            <RowMenu>
                {genre.uiux.process.isOnValidation || genre.uiux.process.isOnRequest
                    ? <Loader />
                    : genre.uiux.status.isSuspended
                    ? <FontAwesomeIcon icon={ faBan } className="icon" />
                    : <GenreMenu openForm={openForm} mode={mode} />
                }
            </RowMenu>

            {genre.uiux.form.isOpen 
                ? 
                <GenreForm 
                    genres={genres} 
                    index={index} 
                    closeForm={closeForm}
                    doValidation={doValidation}
                    validationDone={validationDone}
                    validationError={validationError}
                    doRequest={doRequest}
                /> 
                : 
                null
            }

        </RowBox> 
    );
}

export default GenreList;