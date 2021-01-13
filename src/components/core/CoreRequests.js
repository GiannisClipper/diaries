import { useContext, useEffect } from 'react';
import { doFetch } from '../../helpers/customFetch';

function SigninRequest( { Context, url }) {

    const { state, actions, customization } = useContext( Context );

    const { namespace, parseToDB } = customization.signin;

    const signinResponseOk = payload => actions.signinResponseOk( { namespace, ...payload } );
    const signinResponseError = payload => actions.signinResponseError( { namespace, ...payload } );

    const _item = state[ namespace ];

    const { _uiux } = _item;
    const { process } = _uiux;

    const dataToDB = parseToDB( _item );
    const body = JSON.stringify( { data: { ...dataToDB } } );

    useEffect( () => {
        if ( process.isRequest ) {
            const args = { method: 'PUT', body };
            const onDone = signinResponseOk;
            const onError = signinResponseError;
            const dataFromDB = res => res;
            doFetch( url, args, onDone, onError, dataFromDB );
        }
    } );

    return null;
}

function CreateRequest( { Context, index, url } ) {

    const { state, actions, customization } = useContext( Context );

    const createResponseOk = payload => actions.createResponseOk( { index, ...payload } );
    const createResponseError = payload => actions.createResponseError( { index, ...payload } );
    const createResponseOkAfter = payload => actions.createResponseOkAfter( { index, ...payload } );
    const createResponseErrorAfter = payload => actions.createResponseErrorAfter( { index, ...payload } );
    const handleError = actions.handleError;

    const { namespace, parseToDB } = customization;
    const _item = state[ namespace ][ index ];

    const { _uiux } = _item;
    const { process, error } = _uiux;

    const dataToDB = parseToDB( _item );
    const body = JSON.stringify( { data: { ...dataToDB } } );

    useEffect( () => {
        if ( process.isRequest ) {
            const args = { method: 'POST', body };
            const onDone = createResponseOk;
            const onError = createResponseError;
            const dataFromDB = res => ( { ...dataToDB, _id: res.insertedId } );
            doFetch( url, args, onDone, onError, dataFromDB );

        } else if ( process.isResponseOk ) {
            createResponseOkAfter();

        } else if ( process.isResponseError ) {
            handleError( { error } );
            createResponseErrorAfter();
        }
    } );

    return null;
}

function RetrieveRequest( { Context, index, url } ) {

    const { state, actions, customization } = useContext( Context );

    const retrieveResponseOk = payload => actions.retrieveResponseOk( { index, ...payload } );
    const retrieveResponseError = payload => actions.retrieveResponseError( { index, ...payload } );
    const retrieveResponseOkAfter = payload => actions.retrieveResponseOkAfter( { index, ...payload } );
    const retrieveResponseErrorAfter = payload => actions.retrieveResponseErrorAfter( { index, ...payload } );
    const handleError = actions.handleError;

    const { namespace } = customization;
    const _item = state[ namespace ][ index ];

    const { _uiux } = _item;
    const { process, error } = _uiux;

    useEffect( () => {
        if ( process.isRequest ) {
            const args = { method: 'GET' };
            const onDone = retrieveResponseOk;
            const onError = retrieveResponseError;
            const dataFromDB = res => res;
            //typeof res === 'object' && res !== null
            doFetch( url, args, onDone, onError, dataFromDB );

        } else if ( process.isResponseOk ) {
            retrieveResponseOkAfter();

        } else if ( process.isResponseError ) {
            handleError( { error } );
            retrieveResponseErrorAfter();
        }
} );

    return null;
}

function UpdateRequest( { Context, index, url } ) {

    const { state, actions, customization } = useContext( Context );

    const updateResponseOk = payload => actions.updateResponseOk( { index, ...payload } );
    const updateResponseError = payload => actions.updateResponseError( { index, ...payload } );
    const updateResponseOkAfter = payload => actions.updateResponseOkAfter( { index, ...payload } );
    const updateResponseErrorAfter = payload => actions.updateResponseErrorAfter( { index, ...payload } );
    const handleError = actions.handleError;

    const { namespace, parseToDB } = customization;
    const _item = state[ namespace ][ index ];

    const { _uiux } = _item;
    const { process, error } = _uiux;

    const dataToDB = parseToDB( _item );
    const body = JSON.stringify( { data: { ...dataToDB } } );
    const id = _item.id;

    useEffect( () => {
        if ( process.isRequest ) {
            const args = { method: 'PUT', body };
            const onDone = updateResponseOk;
            const onError = updateResponseError;
            const dataFromDB = () => ( { ...dataToDB, _id: id } );
            doFetch( url, args, onDone, onError, dataFromDB );

        } else if ( process.isResponseOk ) {
            updateResponseOkAfter();

        } else if ( process.isResponseError ) {
            handleError( { error } );
            updateResponseErrorAfter();
        }
    } );

    return null;
}

function DeleteRequest( { Context, index, url } ) {

    const { state, actions, customization } = useContext( Context );

    const deleteResponseOk = payload => actions.deleteResponseOk( { index, ...payload } );
    const deleteResponseError = payload => actions.deleteResponseError( { index, ...payload } );
    const deleteResponseOkAfter = payload => actions.deleteResponseOkAfter( { index, ...payload } );
    const deleteResponseErrorAfter = payload => actions.deleteResponseErrorAfter( { index, ...payload } );
    const handleError = actions.handleError;

    const { namespace, parseToDB } = customization;
    const _item = state[ namespace ][ index ];

    const { _uiux } = _item;
    const { process, error } = _uiux;

    const dataToDB = parseToDB( _item );
    const body = JSON.stringify( { data: { ...dataToDB } } );
    const id = _item.id;

    useEffect( () => {
        if ( process.isRequest ) {
            const args = { method: 'DELETE', body };
            const onDone = deleteResponseOk;
            const onError = deleteResponseError;
            const dataFromDB = () => ( { ...dataToDB, _id: id } );
            doFetch( url, args, onDone, onError, dataFromDB );

        } else if ( process.isResponseOk ) {
            deleteResponseOkAfter();

        } else if ( process.isResponseError ) {
            handleError( { error } );
            deleteResponseErrorAfter();
        }
    } );

    return null;
}

function RetrieveManyRequest( { Context, url } ) {

    const { state, actions } = useContext( Context );

    const { 
        retrieveManyRequest,
        retrieveManyResponseWaiting,
        retrieveManyResponseOk,
        retrieveManyResponseError,
        retrieveManyResponseOkAfter,
        retrieveManyResponseErrorAfter,
        handleError
    } = actions;

    const { _uiux } = state;
    const { process, error } = _uiux;

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
            retrieveManyResponseOkAfter();

        } else if ( process.isResponseError ) {
            handleError( { error } );
            retrieveManyResponseErrorAfter();

        }
    } );

    return null;
}

export { 
    SigninRequest,
    CreateRequest,
    RetrieveRequest,
    UpdateRequest,
    DeleteRequest,
    RetrieveManyRequest
};