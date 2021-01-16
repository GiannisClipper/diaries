import { useContext, useEffect } from 'react';
import prepayAction from './helpers/prepayAction';
import { doFetch } from './helpers/customFetch';

function SigninRequest( { Context, assets, url }) {

    const { state, actions } = useContext( Context );
    const { namespace, parseToDB } = assets;

    const signinResponseOk = prepayAction( actions.signinResponseOk, { assets } );
    const signinResponseError = prepayAction( actions.signinResponseError, { assets } );

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

    const createResponseOk = prepayAction( actions.createResponseOk, { assets, index } );
    const createResponseError = prepayAction( actions.createResponseError, { assets, index } );
    const createResponseOkAfter = prepayAction( actions.createResponseOkAfter, { assets, index } );
    const createResponseErrorAfter = prepayAction( actions.createResponseErrorAfter, { assets, index } );
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

    const retrieveResponseOk = prepayAction( actions.retrieveResponseOk, { assets, index } );
    const retrieveResponseError = prepayAction( actions.retrieveResponseError, { assets, index } );
    const retrieveResponseOkAfter = prepayAction( actions.retrieveResponseOkAfter, { assets, index } );
    const retrieveResponseErrorAfter = prepayAction( actions.retrieveResponseErrorAfter, { assets, index } );
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

    const updateResponseOk = prepayAction( actions.updateResponseOk, { assets, index } );
    const updateResponseError = prepayAction( actions.updateResponseError, { assets, index } );
    const updateResponseOkAfter = prepayAction( actions.updateResponseOkAfter, { assets, index } );
    const updateResponseErrorAfter = prepayAction( actions.updateResponseErrorAfter, { assets, index } );
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

    const deleteResponseOk = prepayAction( actions.deleteResponseOk, { assets, index } );
    const deleteResponseError = prepayAction( actions.deleteResponseError, { assets, index } );
    const deleteResponseOkAfter = prepayAction( actions.deleteResponseOkAfter, { assets, index } );
    const deleteResponseErrorAfter = prepayAction( actions.deleteResponseErrorAfter, { assets, index } );
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

    const retrieveManyRequest = prepayAction( actions.retrieveManyRequest, { assets } );
    const retrieveManyResponseWaiting = prepayAction( actions.retrieveManyResponseWaiting, { assets } );
    const retrieveManyResponseOk = prepayAction( actions.retrieveManyResponseOk, { assets } );
    const retrieveManyResponseError = prepayAction( actions.retrieveManyResponseError, { assets } );
    const retrieveManyResponseOkAfter = prepayAction( actions.retrieveManyResponseOkAfter, { assets } );
    const retrieveManyResponseErrorAfter = prepayAction( actions.retrieveManyResponseErrorAfter, { assets } );
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