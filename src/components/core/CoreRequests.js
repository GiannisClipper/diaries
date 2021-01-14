import { useContext, useEffect } from 'react';
import { doFetch } from '../../helpers/customFetch';

function SigninRequest( { Context, url }) {

    const { state, actions, assets } = useContext( Context );

    const { namespace, parseToDB } = assets.signin;

    const signinResponseOk = payload => actions.signinResponseOk( { ...payload, assets: assets.signin } );
    const signinResponseError = payload => actions.signinResponseError( { ...payload, assets: assets.signin } );

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

    const context = useContext( Context );
    const { state, actions } = context;
    assets = assets || context.assets;
    const { namespace, parseToDB } = assets;

    const createResponseOk = payload => actions.createResponseOk( { ...payload, index, assets } );
    const createResponseError = payload => actions.createResponseError( { ...payload, index, assets } );
    const createResponseOkAfter = payload => actions.createResponseOkAfter( { ...payload, index, assets } );
    const createResponseErrorAfter = payload => actions.createResponseErrorAfter( { ...payload, index, assets } );
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

    const context = useContext( Context );
    const { state, actions } = context;
    assets = assets || context.assets;
    const { namespace } = assets;

    const retrieveResponseOk = payload => actions.retrieveResponseOk( { ...payload, index, assets } );
    const retrieveResponseError = payload => actions.retrieveResponseError( { ...payload, index, assets } );
    const retrieveResponseOkAfter = payload => actions.retrieveResponseOkAfter( { ...payload, index, assets } );
    const retrieveResponseErrorAfter = payload => actions.retrieveResponseErrorAfter( { ...payload, index, assets } );
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

    const context = useContext( Context );
    const { state, actions } = context;
    assets = assets || context.assets;
    const { namespace, parseToDB } = assets;

    const updateResponseOk = payload => actions.updateResponseOk( { ...payload, index, assets } );
    const updateResponseError = payload => actions.updateResponseError( { ...payload, index, assets } );
    const updateResponseOkAfter = payload => actions.updateResponseOkAfter( { ...payload, index, assets } );
    const updateResponseErrorAfter = payload => actions.updateResponseErrorAfter( { ...payload, index, assets } );
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

    const context = useContext( Context );
    const { state, actions } = context;
    assets = assets || context.assets;
    const { namespace, parseToDB } = assets;

    const deleteResponseOk = payload => actions.deleteResponseOk( { ...payload, index, assets } );
    const deleteResponseError = payload => actions.deleteResponseError( { ...payload, index, assets } );
    const deleteResponseOkAfter = payload => actions.deleteResponseOkAfter( { ...payload, index, assets } );
    const deleteResponseErrorAfter = payload => actions.deleteResponseErrorAfter( { ...payload, index, assets } );
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