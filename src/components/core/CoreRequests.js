import { useContext, useEffect } from 'react';
import presetAction from './helpers/presetAction';
import { doFetch } from './helpers/customFetch';

function SigninRequest( { Context, assets, url }) {

    const { state, actions } = useContext( Context );
    const { namespace, parseToDB } = assets;

    const signinResponseOk = presetAction( actions.signinResponseOk, { assets } );
    const signinResponseError = presetAction( actions.signinResponseError, { assets } );

    const _item = state[ namespace ];

    const { _uiux } = _item;
    const { status } = _uiux;

    const dataToDB = parseToDB( _item );
    const body = JSON.stringify( { data: { ...dataToDB } } );

    useEffect( () => {
        if ( status.isRequest ) {
            const args = { method: 'PUT', body };
            const onDone = signinResponseOk;
            const onError = signinResponseError;
            const dataFromDB = res => res;
            doFetch( url, args, onDone, onError, dataFromDB );
        }
    } );

    return null;
}

function CreateRequest( { Context, assets, index, url } ) {

    const { state, actions } = useContext( Context );
    const { namespace, parseToDB } = assets;

    const createResponseOk = presetAction( actions.createResponseOk, { assets, index } );
    const createResponseError = presetAction( actions.createResponseError, { assets, index } );
    const createResponseOkAfter = presetAction( actions.createResponseOkAfter, { assets, index } );
    const createResponseErrorAfter = presetAction( actions.createResponseErrorAfter, { assets, index } );
    const handleError = actions.handleError;

    const _item = index !== undefined 
        ? state[ namespace ][ index ]
        : state[ namespace ];

    const { _uiux } = _item;
    const { status, error } = _uiux;

    const dataToDB = parseToDB( _item );
    const body = JSON.stringify( { data: { ...dataToDB } } );

    useEffect( () => {
        if ( status.isRequest ) {
            const args = { method: 'POST', body };
            const onDone = createResponseOk;
            const onError = createResponseError;
            const dataFromDB = res => ( { ...dataToDB, _id: res.insertedId } );
            doFetch( url, args, onDone, onError, dataFromDB );

        } else if ( status.isResponseOk ) {
            createResponseOkAfter();

        } else if ( status.isResponseError ) {
            handleError( { error } );
            createResponseErrorAfter();
        }
    } );

    return null;
}

function RetrieveRequest( { Context, assets, index, url } ) {

    const { state, actions } = useContext( Context );
    const { namespace } = assets;

    const retrieveResponseOk = presetAction( actions.retrieveResponseOk, { assets, index } );
    const retrieveResponseError = presetAction( actions.retrieveResponseError, { assets, index } );
    const retrieveResponseOkAfter = presetAction( actions.retrieveResponseOkAfter, { assets, index } );
    const retrieveResponseErrorAfter = presetAction( actions.retrieveResponseErrorAfter, { assets, index } );
    const handleError = actions.handleError;

    const _item = index !== undefined 
        ? state[ namespace ][ index ]
        : state[ namespace ];

    const { _uiux } = _item;
    const { status, error } = _uiux;

    useEffect( () => {
        if ( status.isRequest ) {
            const args = { method: 'GET' };
            const onDone = retrieveResponseOk;
            const onError = retrieveResponseError;
            const dataFromDB = res => res;
            //typeof res === 'object' && res !== null
            doFetch( url, args, onDone, onError, dataFromDB );

        } else if ( status.isResponseOk ) {
            retrieveResponseOkAfter();

        } else if ( status.isResponseError ) {
            handleError( { error } );
            retrieveResponseErrorAfter();
        }
} );

    return null;
}

function UpdateRequest( { Context, assets, index, url } ) {

    const { state, actions } = useContext( Context );
    const { namespace, parseToDB } = assets;

    const updateResponseOk = presetAction( actions.updateResponseOk, { assets, index } );
    const updateResponseError = presetAction( actions.updateResponseError, { assets, index } );
    const updateResponseOkAfter = presetAction( actions.updateResponseOkAfter, { assets, index } );
    const updateResponseErrorAfter = presetAction( actions.updateResponseErrorAfter, { assets, index } );
    const handleError = actions.handleError;

    const _item = index !== undefined 
        ? state[ namespace ][ index ]
        : state[ namespace ];

    const { _uiux } = _item;
    const { status, error } = _uiux;

    const dataToDB = parseToDB( _item );
    const body = JSON.stringify( { data: { ...dataToDB } } );
    const id = _item.id;

    useEffect( () => {
        if ( status.isRequest ) {
            const args = { method: 'PUT', body };
            const onDone = updateResponseOk;
            const onError = updateResponseError;
            const dataFromDB = () => ( { ...dataToDB, _id: id } );
            doFetch( url, args, onDone, onError, dataFromDB );

        } else if ( status.isResponseOk ) {
            updateResponseOkAfter();

        } else if ( status.isResponseError ) {
            handleError( { error } );
            updateResponseErrorAfter();
        }
    } );

    return null;
}

function DeleteRequest( { Context, assets, index, url } ) {

    const { state, actions } = useContext( Context );
    const { namespace, parseToDB } = assets;

    const deleteResponseOk = presetAction( actions.deleteResponseOk, { assets, index } );
    const deleteResponseError = presetAction( actions.deleteResponseError, { assets, index } );
    const deleteResponseOkAfter = presetAction( actions.deleteResponseOkAfter, { assets, index } );
    const deleteResponseErrorAfter = presetAction( actions.deleteResponseErrorAfter, { assets, index } );
    const handleError = actions.handleError;

    const _item = index !== undefined 
        ? state[ namespace ][ index ]
        : state[ namespace ];

    const { _uiux } = _item;
    const { status, error } = _uiux;

    const dataToDB = parseToDB( _item );
    const body = JSON.stringify( { data: { ...dataToDB } } );
    const id = _item.id;

    useEffect( () => {
        if ( status.isRequest ) {
            const args = { method: 'DELETE', body };
            const onDone = deleteResponseOk;
            const onError = deleteResponseError;
            const dataFromDB = () => ( { ...dataToDB, _id: id } );
            doFetch( url, args, onDone, onError, dataFromDB );

        } else if ( status.isResponseOk ) {
            deleteResponseOkAfter();

        } else if ( status.isResponseError ) {
            handleError( { error } );
            deleteResponseErrorAfter();
        }
    } );

    return null;
}

function RetrieveManyRequest( { Context, assets, url } ) {

    const { state, actions } = useContext( Context );

    const retrieveManyRequest = presetAction( actions.retrieveManyRequest, { assets } );
    const retrieveManyResponseWaiting = presetAction( actions.retrieveManyResponseWaiting, { assets } );
    const retrieveManyResponseOk = presetAction( actions.retrieveManyResponseOk, { assets } );
    const retrieveManyResponseError = presetAction( actions.retrieveManyResponseError, { assets } );
    const retrieveManyResponseOkAfter = presetAction( actions.retrieveManyResponseOkAfter, { assets } );
    const retrieveManyResponseErrorAfter = presetAction( actions.retrieveManyResponseErrorAfter, { assets } );
    const handleError = actions.handleError;

    const { _uiux } = state;
    const { status, error } = _uiux;

    useEffect( () => {
        if ( status.isRequestBefore ) {
            retrieveManyRequest();

        } else if ( status.isRequest ) {
            const args = { method: 'GET' };
            const onDone = retrieveManyResponseOk;
            const onError = retrieveManyResponseError;
            const dataFromDB = res => Array.isArray( res ) ? res : [];
            doFetch( url, args, onDone, onError, dataFromDB );
            retrieveManyResponseWaiting();

        } else if ( status.isResponseWaiting ) {
            // do nothing here

        } else if ( status.isResponseOk ) {
            retrieveManyResponseOkAfter();

        } else if ( status.isResponseError ) {
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