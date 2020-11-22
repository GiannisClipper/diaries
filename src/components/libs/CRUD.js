import React, { createContext, useContext, useEffect } from 'react';

import { OkCancelForm } from './Forms';

import { Loader } from './Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { EditTool, DeleteTool } from './Tools';
import texts from '../../storage/texts';

import { action } from '../../storage/actions';

import { realFetch, mockFetch } from '../../helpers/customFetch';

const CRUDContext = createContext();

const CRUDContextProvider = ( { dispatch, namespace, payload, children } ) => {

    const actions = {
        openForm: action( { dispatch, namespace, type: 'OPEN_FORM', payload } ),
        closeForm: action( { dispatch, namespace, type: 'CLOSE_FORM', payload } ),

        doValidation: action( { dispatch, namespace, type: 'DO_VALIDATION', payload } ),
        validationDone: action( { dispatch, namespace, type: 'VALIDATION_DONE', payload } ),
        validationError: action( { dispatch, namespace, type: 'VALIDATION_ERROR', payload } ),

        doRequest: action( { dispatch, namespace, type: 'DO_REQUEST', payload } ),

        createRequestDone: action( { dispatch, namespace, type: 'CREATE_REQUEST_DONE', payload } ),
        createRequestError: action( { dispatch, namespace, type: 'CREATE_REQUEST_ERROR', payload } ),

        updateRequestDone: action( { dispatch, namespace, type: 'UPDATE_REQUEST_DONE', payload } ),
        updateRequestError: action( { dispatch, namespace, type: 'UPDATE_REQUEST_ERROR', payload } ),

        deleteRequestDone: action( { dispatch, namespace, type: 'DELETE_REQUEST_DONE', payload } ),
        deleteRequestError: action( { dispatch, namespace, type: 'DELETE_REQUEST_ERROR', payload } ),

        retrieveAllRequest: action( { dispatch, namespace, type: 'RETRIEVE_ALL_REQUEST', payload } ),
        retrieveAllRequestWaiting: action( { dispatch, namespace, type: 'RETRIEVE_ALL_REQUEST_WAITING', payload } ),
        retrieveAllRequestDone: action( { dispatch, namespace, type: 'RETRIEVE_ALL_REQUEST_DONE', payload } ),
        retrieveAllRequestError: action( { dispatch, namespace, type: 'RETRIEVE_ALL_REQUEST_ERROR', payload } ),
    }

    useEffect( () => {
        console.log( 'Has rendered. ', 'CRUDContext.Provider' );
    } );

    return (
        <CRUDContext.Provider value={{ ...actions }}>
            {children}
        </CRUDContext.Provider>
    )
}

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
    console.log( 'Requesting... ', url, args.method )

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

function CreateRequest( { process, url, data, parseDataToDB }) {

    const { createRequestDone, createRequestError } = useContext( CRUDContext );

    useEffect( () => {
        if ( process.isOnRequest ) {
            const dataToDB = parseDataToDB( data );
            const body = JSON.stringify( { data: dataToDB } );    
            const args = { method: 'POST', body };
            const onDone = createRequestDone;
            const onError = createRequestError;
            const dataFromDB = res => ( { ...dataToDB, _id: res.insertedId } );
            doFetch( url, args, onDone, onError, dataFromDB );
        }
    } );

    return <></>;
}

function UpdateRequest( { process, url, data, parseDataToDB }) {

    const { updateRequestDone, updateRequestError } = useContext( CRUDContext );

    useEffect( () => {
        if ( process.isOnRequest ) {
            const dataToDB = parseDataToDB( data );
            const body = JSON.stringify( { data: dataToDB } );    
            const args = { method: 'PUT', body };
            const onDone = updateRequestDone;
            const onError = updateRequestError;
            const getDataId = res => data.id;
            const dataFromDB = res => ( { ...dataToDB, _id: getDataId( res ) } );
            doFetch( url, args, onDone, onError, dataFromDB );
        }
    } );

    return <></>;
}

function DeleteRequest( { process, url, data, parseDataToDB }) {

    const { deleteRequestDone, deleteRequestError } = useContext( CRUDContext );

    useEffect( () => {
        if ( process.isOnRequest ) {
            const dataToDB = parseDataToDB( data );
            const body = JSON.stringify( { data: dataToDB } );    
            const args = { method: 'DELETE', body };
            const onDone = deleteRequestDone;
            const onError = deleteRequestError;
            const getDataId = () => data.id;
            const dataFromDB = res => ( { ...dataToDB, _id: getDataId( res ) } );
            doFetch( url, args, onDone, onError, dataFromDB );
        }
    } );

    return <></>;
}

function RetrieveAllRequest( { process, url }) {

    const { 
        retrieveAllRequest,
        retrieveAllRequestWaiting,
        retrieveAllRequestDone,
        retrieveAllRequestError 
    } = useContext( CRUDContext );

    useEffect( () => {
        if ( Object.keys( process ).length === 0 ) {  // process === {}
            console.log( 'To_init_users...' )
            retrieveAllRequest();

        } else if ( process.isOnRequest ) {
            const args = { method: 'GET' };
            const onDone = retrieveAllRequestDone;
            const onError = retrieveAllRequestError;
            const dataFromDB = res => Array.isArray( res ) ? res : [];
            doFetch( url, args, onDone, onError, dataFromDB );
            retrieveAllRequestWaiting();
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