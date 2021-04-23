import presetAction from '../helpers/presetAction';
import { doFetch } from '../helpers/customFetch';

function signinRequestFeature( { _item, actions, assets, url }) {

    const signinRequest = presetAction( actions.signinRequest, { assets } );
    const signinResponseOk = presetAction( actions.signinResponseOk, { assets } );
    const signinResponseError = presetAction( actions.signinResponseError, { assets } );

    const { _uiux } = _item;
    const { status } = _uiux;

    if ( status.isValidationOk ) {
        signinRequest();

    } else if ( status.isRequest ) {
        const { parseToDB } = assets;
        const dataToDB = parseToDB( _item );
        const body = JSON.stringify( { data: { ...dataToDB } } );
        const args = { method: 'POST', body };
        const onDone = signinResponseOk;
        const onError = signinResponseError;
        const dataFromDB = res => res;
        doFetch( url, args, onDone, onError, dataFromDB );
    }
}

function createRequestFeature( { _item, actions, assets, index, url } ) {

    const createRequest = presetAction( actions.createRequest, { assets, index } );
    const createResponseOk = presetAction( actions.createResponseOk, { assets, index } );
    const createResponseError = presetAction( actions.createResponseError, { assets, index } );
    const createResponseOkAfter = presetAction( actions.createResponseOkAfter, { assets, index } );
    const createResponseErrorAfter = presetAction( actions.createResponseErrorAfter, { assets, index } );
    const handleError = actions.handleError;

    const { _uiux } = _item;
    const { status, error } = _uiux;

    if ( status.isValidationOk ) {
        createRequest();

    } else if ( status.isRequest ) {
        const { parseToDB, parseFromDB } = assets;
        const dataToDB = parseToDB( _item );
        const body = JSON.stringify( { data: { ...dataToDB } } );
        const args = { method: 'POST', body };
        const onDone = createResponseOk;
        const onError = createResponseError;
        const dataLocally = parseFromDB( _item );
        const dataFromDB = res => ( { ...dataLocally, _id: res.insertedId } );
        doFetch( url, args, onDone, onError, dataFromDB );

    } else if ( status.isResponseOk ) {
        createResponseOkAfter();

    } else if ( status.isResponseError ) {
        handleError( { error } );
        createResponseErrorAfter();
    }
}

function retrieveRequestFeature( { _item, actions, assets, index, url } ) {

    const retrieveRequest = presetAction( actions.retrieveRequest, { assets, index } );
    const retrieveResponseOk = presetAction( actions.retrieveResponseOk, { assets, index } );
    const retrieveResponseError = presetAction( actions.retrieveResponseError, { assets, index } );
    const retrieveResponseOkAfter = presetAction( actions.retrieveResponseOkAfter, { assets, index } );
    const retrieveResponseErrorAfter = presetAction( actions.retrieveResponseErrorAfter, { assets, index } );
    const handleError = actions.handleError;

    const { _uiux } = _item;
    const { status, error } = _uiux;

    if ( status.isValidationOk ) {
        retrieveRequest();

    } else if ( status.isRequest ) {
        const args = { method: 'GET' };
        const onDone = retrieveResponseOk;
        const onError = retrieveResponseError;
        const dataFromDB = res => res;
        doFetch( url, args, onDone, onError, dataFromDB );

    } else if ( status.isResponseOk ) {
        retrieveResponseOkAfter();

    } else if ( status.isResponseError ) {
        handleError( { error } );
        retrieveResponseErrorAfter();
    }
}

function updateRequestFeature( { _item, actions, assets, index, url } ) {

    const updateRequest = presetAction( actions.updateRequest, { assets, index } );
    const updateResponseOk = presetAction( actions.updateResponseOk, { assets, index } );
    const updateResponseError = presetAction( actions.updateResponseError, { assets, index } );
    const updateResponseOkAfter = presetAction( actions.updateResponseOkAfter, { assets, index } );
    const updateResponseErrorAfter = presetAction( actions.updateResponseErrorAfter, { assets, index } );
    const handleError = actions.handleError;

    const { _uiux } = _item;
    const { status, error } = _uiux;

    if ( status.isValidationOk ) {
        updateRequest();

    } else if ( status.isRequest ) {
        const { parseToDB, parseFromDB } = assets;
        const dataToDB = parseToDB( _item );
        const body = JSON.stringify( { data: { ...dataToDB } } );
        const id = _item.id;
        const args = { method: 'PUT', body };
        const onDone = updateResponseOk;
        const onError = updateResponseError;
        const dataLocally = parseFromDB( _item );
        const dataFromDB = () => ( { ...dataLocally, _id: id } );
        doFetch( url, args, onDone, onError, dataFromDB );

    } else if ( status.isResponseOk ) {
        updateResponseOkAfter();

    } else if ( status.isResponseError ) {
        handleError( { error } );
        updateResponseErrorAfter();
    }
}

function deleteRequestFeature( { _item, actions, assets, index, url } ) {

    const deleteRequest = presetAction( actions.deleteRequest, { assets, index } );
    const deleteResponseOk = presetAction( actions.deleteResponseOk, { assets, index } );
    const deleteResponseError = presetAction( actions.deleteResponseError, { assets, index } );
    const deleteResponseOkAfter = presetAction( actions.deleteResponseOkAfter, { assets, index } );
    const deleteResponseErrorAfter = presetAction( actions.deleteResponseErrorAfter, { assets, index } );
    const handleError = actions.handleError;

    const { _uiux } = _item;
    const { status, error } = _uiux;

    if ( status.isValidationOk ) {
        deleteRequest();

    } else if ( status.isRequest ) {
        const { parseToDB, parseFromDB } = assets;
        const dataToDB = parseToDB( _item );
        const body = JSON.stringify( { data: { ...dataToDB } } );
        const id = _item.id;    
        const args = { method: 'DELETE', body };
        const onDone = deleteResponseOk;
        const onError = deleteResponseError;
        const dataLocally = parseFromDB( _item );
        const dataFromDB = () => ( { ...dataLocally, _id: id } );
        doFetch( url, args, onDone, onError, dataFromDB );

    } else if ( status.isResponseOk ) {
        deleteResponseOkAfter();

    } else if ( status.isResponseError ) {
        handleError( { error } );
        deleteResponseErrorAfter();
    }
}

function retrieveManyRequestFeature( { _uiux, actions, assets, url } ) {

    const retrieveManyRequest = presetAction( actions.retrieveManyRequest, { assets } );
    const retrieveManyResponseWaiting = presetAction( actions.retrieveManyResponseWaiting, { assets } );
    const retrieveManyResponseOk = presetAction( actions.retrieveManyResponseOk, { assets } );
    const retrieveManyResponseError = presetAction( actions.retrieveManyResponseError, { assets } );
    const retrieveManyResponseOkAfter = presetAction( actions.retrieveManyResponseOkAfter, { assets } );
    const retrieveManyResponseErrorAfter = presetAction( actions.retrieveManyResponseErrorAfter, { assets } );
    const handleError = actions.handleError;

    const { status, error } = _uiux;

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
}

export { 
    signinRequestFeature,
    createRequestFeature,
    retrieveRequestFeature,
    updateRequestFeature,
    deleteRequestFeature,
    retrieveManyRequestFeature
};