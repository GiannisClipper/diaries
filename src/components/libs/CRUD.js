import React, { createContext, useCallback, useContext, useEffect } from 'react';

import { OkCancelForm } from './Forms';

import { Loader } from './Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { EditTool, DeleteTool } from './Tools';
import texts from '../../storage/texts';

import { realFetch, mockFetch } from '../../helpers/customFetch';

const CRUDContext = createContext();

const CRUDContextProvider = React.memo( ( { dispatch, namespace, payload, children } ) => {

    payload = payload || '{}';

    const actions = {
        openMenu: useCallback(
            payload2 => dispatch( { namespace, type: 'OPEN_MENU', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        closeMenu: useCallback(
            payload2 => dispatch( { namespace, type: 'CLOSE_MENU', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        openForm: useCallback(
            payload2 => dispatch( { namespace, type: 'OPEN_FORM', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        closeForm: useCallback(
            payload2 => dispatch( { namespace, type: 'CLOSE_FORM', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        doValidation: useCallback(
            payload2 => dispatch( { namespace, type: 'DO_VALIDATION', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        validationDone: useCallback(
            payload2 => dispatch( { namespace, type: 'VALIDATION_DONE', payload: { ...payload, ...payload2 } } ), 
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
        createRequestDone: useCallback(
            payload2 => dispatch( { namespace, type: 'CREATE_REQUEST_DONE', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        createRequestError: useCallback(
            payload2 => dispatch( { namespace, type: 'CREATE_REQUEST_ERROR', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        updateRequestDone: useCallback(
            payload2 => dispatch( { namespace, type: 'UPDATE_REQUEST_DONE', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        updateRequestError: useCallback(
            payload2 => dispatch( { namespace, type: 'UPDATE_REQUEST_ERROR', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        deleteRequestDone: useCallback(
            payload2 => dispatch( { namespace, type: 'DELETE_REQUEST_DONE', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        deleteRequestError: useCallback(
            payload2 => dispatch( { namespace, type: 'DELETE_REQUEST_ERROR', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        retrieveAllRequestBefore: useCallback(
            payload2 => dispatch( { namespace, type: 'RETRIEVE_ALL_REQUEST_BEFORE', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        retrieveAllRequest: useCallback(
            payload2 => dispatch( { namespace, type: 'RETRIEVE_ALL_REQUEST', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        retrieveAllRequestAfter: useCallback(
            payload2 => dispatch( { namespace, type: 'RETRIEVE_ALL_REQUEST_AFTER', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        retrieveAllRequestDone: useCallback(
            payload2 => dispatch( { namespace, type: 'RETRIEVE_ALL_REQUEST_DONE', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        retrieveAllRequestError: useCallback(
            payload2 => dispatch( { namespace, type: 'RETRIEVE_ALL_REQUEST_ERROR', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
    }

    useEffect( () => {
        console.log( 'Has rendered. ', 'CRUDContextProvider' );
    } );

    return (
        <CRUDContext.Provider value={{ ...actions }}>
            {children}
        </CRUDContext.Provider>
    )
} );

function CRUDForm( { headLabel, mode, isOnRequest, children } ) {

    const { closeForm, doValidation, doRequest } = useContext( CRUDContext );

    const okLabel = ( 
        mode.isCreate ?
            texts.buttons.create :
        mode.isUpdate ?
            texts.buttons.update :
        mode.isDelete ?
            texts.buttons.delete :
        null 
    );

    const cancelLabel = texts.buttons.cancel;

    return (
        <OkCancelForm
            headLabel={headLabel}
            okLabel={okLabel}
            cancelLabel={cancelLabel}
            onClickOk={mode.isCreate || mode.isUpdate ? doValidation : doRequest}
            onClickCancel={closeForm}
            isOnRequest={isOnRequest}
            isDelete={mode.isDelete}
        >
            {children}
        </OkCancelForm>
    );
}

function CRUDMenu( { process, status, id } ) {

    const { openForm } = useContext( CRUDContext );

    return ( 
        process.isOnValidation || process.isOnRequest
            ? <Loader />
            : status.isSuspended
            ? <FontAwesomeIcon icon={faBan} className="icon" />
            : !id
            ? 
            <EditTool onClick={event => openForm( { mode: { isCreate: true } } )} />
            : 
            <>
            <EditTool onClick={event => openForm( { mode: { isUpdate: true } } )} />
            <DeleteTool onClick={event => openForm( { mode: { isDelete: true } } )} />
            </>
    );
}

function InputValidations( { process, doValidate }) {
    const { 
        validationDone,
        validationError,
        doRequest,
    } = useContext( CRUDContext );


    useEffect( () => {
    
        if ( process.isOnValidation ) {

            const { data, errors } = doValidate();

            if ( errors === '' ) {
                validationDone( { data } )

            } else {
                alert( errors );
                validationError();
            }

        } else if ( process.isOnValidationDone ) {
            doRequest();
        }
    } );

    return <></>;
}

const doFetch = ( url, args, onDone, onError, dataFromDB ) => {
    //console.log( 'Requesting... ', url, args.method )

    realFetch( url, args )
    .then( res => {
        alert( JSON.stringify( res ) );
        onDone( { dataFromDB: dataFromDB( res ) } );
    } )
    .catch( err => { 
        alert( err );
        onError( { error: err } );
    } );
}

function CreateRequest( { process, url, body, dataToDB }) {

    const { createRequestDone, createRequestError } = useContext( CRUDContext );

    useEffect( () => {
        if ( process.isOnRequest ) {
            const args = { method: 'POST', body };
            const onDone = createRequestDone;
            const onError = createRequestError;
            const dataFromDB = res => ( { ...dataToDB, _id: res.insertedId } );
            doFetch( url, args, onDone, onError, dataFromDB );
        }
    } );

    return <></>;
}

function UpdateRequest( { process, url, body, dataToDB, id }) {

    const { updateRequestDone, updateRequestError } = useContext( CRUDContext );

    useEffect( () => {
        if ( process.isOnRequest ) {
            const args = { method: 'PUT', body };
            const onDone = updateRequestDone;
            const onError = updateRequestError;
            const dataFromDB = () => ( { ...dataToDB, _id: id } );
            doFetch( url, args, onDone, onError, dataFromDB );
        }
    } );

    return <></>;
}

function DeleteRequest( { process, url, body, dataToDB, id }) {

    const { deleteRequestDone, deleteRequestError } = useContext( CRUDContext );

    useEffect( () => {
        if ( process.isOnRequest ) {
            const args = { method: 'DELETE', body };
            const onDone = deleteRequestDone;
            const onError = deleteRequestError;
            const dataFromDB = () => ( { ...dataToDB, _id: id } );
            doFetch( url, args, onDone, onError, dataFromDB );
        }
    } );

    return <></>;
}

function RetrieveAllRequest( { process, url }) {

    const { 
        retrieveAllRequestBefore,
        retrieveAllRequest,
        retrieveAllRequestAfter,
        retrieveAllRequestDone,
        retrieveAllRequestError 
    } = useContext( CRUDContext );

    useEffect( () => {
        if ( Object.keys( process ).length === 0 ) {  // process === {}
            retrieveAllRequestBefore();

        } else if ( process.isOnRequestBefore ) {
            retrieveAllRequest();

        } else if ( process.isOnRequest ) {
            const args = { method: 'GET' };
            const onDone = retrieveAllRequestDone;
            const onError = retrieveAllRequestError;
            const dataFromDB = res => Array.isArray( res ) ? res : [];
            doFetch( url, args, onDone, onError, dataFromDB );
            retrieveAllRequestAfter();

        } else if ( process.isOnRequestAfter ) {
            // nothing here

        } else if ( process.isSuspended ) {
            retrieveAllRequestError();

        } else if ( process.isOnRequestDone ) {
            // nothing here

        } else if ( process.isOnRequestError ) {
            // nothing here

        }
    } );

    return <></>;
}

export { 
    CRUDContext,
    CRUDContextProvider,
    CRUDForm,
    CRUDMenu,
    InputValidations,
    CreateRequest,
    UpdateRequest,
    DeleteRequest,
    RetrieveAllRequest,
};