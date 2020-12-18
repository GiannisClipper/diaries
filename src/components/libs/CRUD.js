import React, { createContext, useCallback, useContext, useEffect } from 'react';

import { OkCancelForm } from './Forms';

import { Loader } from './Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { EditTool, DeleteTool } from './Tools';
import texts from '../../storage/texts';

import { doFetch } from '../../helpers/customFetch';

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
        createResponseOk: useCallback(
            payload2 => dispatch( { namespace, type: 'CREATE_RESPONSE_OK', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        createResponseError: useCallback(
            payload2 => dispatch( { namespace, type: 'CREATE_RESPONSE_ERROR', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        updateResponseOk: useCallback(
            payload2 => dispatch( { namespace, type: 'UPDATE_RESPONSE_OK', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        updateResponseError: useCallback(
            payload2 => dispatch( { namespace, type: 'UPDATE_RESPONSE_ERROR', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        deleteResponseOk: useCallback(
            payload2 => dispatch( { namespace, type: 'DELETE_RESPONSE_OK', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        deleteResponseError: useCallback(
            payload2 => dispatch( { namespace, type: 'DELETE_RESPONSE_ERROR', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ),
        retrieveManyRequest: useCallback(
            payload2 => dispatch( { namespace, type: 'RETRIEVE_MANY_REQUEST', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        retrieveManyResponseWaiting: useCallback(
            payload2 => dispatch( { namespace, type: 'RETRIEVE_MANY_RESPONSE_WAITING', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        retrieveManyResponseOk: useCallback(
            payload2 => dispatch( { namespace, type: 'RETRIEVE_MANY_RESPONSE_OK', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        retrieveManyResponseError: useCallback(
            payload2 => dispatch( { namespace, type: 'RETRIEVE_MANY_RESPONSE_ERROR', payload: { ...payload, ...payload2 } } ), 
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

function CRUDMenu( { options, process, status } ) {

    const { openForm } = useContext( CRUDContext );

    return ( 
        process.isValidation || 
        process.isRequestBefore ||
        process.isRequest ||
        process.isResponseWaiting ?
            <Loader />

        : status && status.isSuspended ?
            <FontAwesomeIcon icon={faBan} className="icon" />

        : 
        <>
            {options.includes( 'C' ) ? <EditTool onClick={event => openForm( { mode: { isCreate: true } } )} /> : null}
            {options.includes( 'RM' ) ? <EditTool onClick={event => openForm( { mode: { isRetrieveMany: true } } )} /> : null}
            {options.includes( 'U' ) ? <EditTool onClick={event => openForm( { mode: { isUpdate: true } } )} /> : null}
            {options.includes( 'D' ) ? <DeleteTool onClick={event => openForm( { mode: { isDelete: true } } )} /> : null}
        </>
    );
}

function CRUDForm( { headLabel, mode, process, validation, children } ) {

    const { closeForm, doValidation, doRequest } = useContext( CRUDContext );

    const okLabel = ( 
        mode.isCreate ?
            texts.buttons.create :
        mode.isUpdate ?
            texts.buttons.update :
        mode.isDelete ?
            texts.buttons.delete :
        mode.isRetrieveMany ?
            texts.buttons.retrieveMany :
        null
    );

    const cancelLabel = texts.buttons.cancel;

    return (
        <OkCancelForm
            headLabel={headLabel}
            okLabel={okLabel}
            cancelLabel={cancelLabel}
            onClickOk={!validation || mode.isDelete ? doRequest : doValidation}
            onClickCancel={closeForm}
            isRequest={process.isRequest}
            isDelete={mode.isDelete}
        >
            <InputValidation
                process={process}
                validation={validation}
            />

            {children}
        </OkCancelForm>
    );
}

function InputValidation( { process, validation }) {

    const { validationOk, validationError, doRequest } = useContext( CRUDContext );

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

    return <></>;
}

function CreateRequest( { process, url, body, dataToDB }) {

    const { createResponseOk, createResponseError } = useContext( CRUDContext );

    useEffect( () => {
        if ( process.isRequest ) {
            const args = { method: 'POST', body };
            const onDone = createResponseOk;
            const onError = createResponseError;
            const dataFromDB = res => ( { ...dataToDB, _id: res.insertedId } );
            doFetch( url, args, onDone, onError, dataFromDB );
        }
    } );

    return <></>;
}

function UpdateRequest( { process, url, body, dataToDB, id }) {

    const { updateResponseOk, updateResponseError } = useContext( CRUDContext );

    useEffect( () => {
        if ( process.isRequest ) {
            const args = { method: 'PUT', body };
            const onDone = updateResponseOk;
            const onError = updateResponseError;
            const dataFromDB = () => ( { ...dataToDB, _id: id } );
            doFetch( url, args, onDone, onError, dataFromDB );
        }
    } );

    return <></>;
}

function DeleteRequest( { process, url, body, dataToDB, id }) {

    const { deleteResponseOk, deleteResponseError } = useContext( CRUDContext );

    useEffect( () => {
        if ( process.isRequest ) {
            const args = { method: 'DELETE', body };
            const onDone = deleteResponseOk;
            const onError = deleteResponseError;
            const dataFromDB = () => ( { ...dataToDB, _id: id } );
            doFetch( url, args, onDone, onError, dataFromDB );
        }
    } );

    return <></>;
}

function RetrieveManyRequest( { process, url } ) {

    const { 
        retrieveManyRequest,
        retrieveManyResponseWaiting,
        retrieveManyResponseOk,
        retrieveManyResponseError 
    } = useContext( CRUDContext );

    useEffect( () => {
        if ( process.isRequestBefore ) {
            retrieveManyRequest();

        } else if ( process.isRequest ) {
            const args = { method: 'GET' };
            const onDone = retrieveManyResponseOk;
            const onError = retrieveManyResponseError;
            const dataFromDB = res => Array.isArray( res ) ? res : [];
            doFetch( url, args, onDone, onError, dataFromDB );
            retrieveManyResponseWaiting();

        } else if ( process.isResponseWaiting ) {
            // do nothing here

        } else if ( process.isResponseOk ) {
            // do nothing here

        } else if ( process.isResponseError ) {
            // do nothing here

        }
    } );

    return <></>;
}

export { 
    CRUDContext,
    CRUDContextProvider,
    CRUDForm,
    CRUDMenu,
    CreateRequest,
    UpdateRequest,
    DeleteRequest,
    RetrieveManyRequest
};