import React, { createContext, useCallback, useContext, useEffect } from 'react';

import { OkCancelForm } from './Forms';

import { Loader } from './Loader';
import { EditTool } from './Tools';
import texts from '../../storage/texts';

import { doFetch } from '../../helpers/customFetch';

const RetrieveManyContext = createContext();

const RetrieveManyContextProvider = React.memo( ( { dispatch, namespace, payload, children } ) => {

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
        retrieveManyRequestBefore: useCallback(
            payload2 => dispatch( { namespace, type: 'RETRIEVE_MANY_REQUEST_BEFORE', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        retrieveManyRequest: useCallback(
            payload2 => dispatch( { namespace, type: 'RETRIEVE_MANY_REQUEST', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        retrieveManyRequestAfter: useCallback(
            payload2 => dispatch( { namespace, type: 'RETRIEVE_MANY_REQUEST_AFTER', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        retrieveManyRequestDone: useCallback(
            payload2 => dispatch( { namespace, type: 'RETRIEVE_MANY_REQUEST_DONE', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
        retrieveManyRequestError: useCallback(
            payload2 => dispatch( { namespace, type: 'RETRIEVE_MANY_REQUEST_ERROR', payload: { ...payload, ...payload2 } } ), 
            [ dispatch, namespace, payload ]
        ), 
    }

    useEffect( () => {
        console.log( 'Has rendered. ', 'RetrieveManyContextProvider' );
    } );

    return (
        <RetrieveManyContext.Provider value={{ ...actions }}>
            {children}
        </RetrieveManyContext.Provider>
    )
} );

function RetrieveManyMenu( { process } ) {

    const { openForm } = useContext( RetrieveManyContext );

    return ( 
        process.isOnRequest
            ? <Loader />
            : <EditTool onClick={event => openForm()} />
    );
}

function RetrieveManyForm( { headLabel, isOnRequest, children } ) {

    const { closeForm, retrieveManyRequestBefore } = useContext( RetrieveManyContext );

    const okLabel = texts.buttons.retrieveMany;
    const cancelLabel = texts.buttons.cancel;

    return (
        <OkCancelForm
            headLabel={headLabel}
            okLabel={okLabel}
            cancelLabel={cancelLabel}
            onClickOk={retrieveManyRequestBefore}
            onClickCancel={closeForm}
            isOnRequest={isOnRequest}
        >
            {children}
        </OkCancelForm>
    );
}

function RetrieveManyRequest( { process, url }) {

    const { 
        retrieveManyRequestBefore,
        retrieveManyRequest,
        retrieveManyRequestAfter,
        retrieveManyRequestDone,
        retrieveManyRequestError 
    } = useContext( RetrieveManyContext );

    useEffect( () => {
        if ( Object.keys( process ).length === 0 ) {  // process === {}
            retrieveManyRequestBefore();

        } else if ( process.isOnRequestBefore ) {
            retrieveManyRequest();

        } else if ( process.isOnRequest ) {
            const args = { method: 'GET' };
            const onDone = retrieveManyRequestDone;
            const onError = retrieveManyRequestError;
            const dataFromDB = res => Array.isArray( res ) ? res : [];
            doFetch( url, args, onDone, onError, dataFromDB );
            retrieveManyRequestAfter();

        } else if ( process.isOnRequestAfter ) {
            // nothing here

        } else if ( process.isSuspended ) {
            retrieveManyRequestError();

        } else if ( process.isDone ) {
            // nothing here

        } else if ( process.isError ) {
            // nothing here

        }
    } );

    return <></>;
}

export { 
    RetrieveManyContext,
    RetrieveManyContextProvider,
    RetrieveManyMenu,
    RetrieveManyForm,
    RetrieveManyRequest,
};