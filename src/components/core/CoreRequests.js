import { useContext, useEffect } from 'react';
import { CoreContext } from './CoreContext';
import { doFetch } from '../../helpers/customFetch';

function SigninRequest( { process, url, body, dataToDB }) {

    const { signinResponseOk, signinResponseError } = useContext( CoreContext );

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

function CreateRequest( { process, url, body, dataToDB, error }) {
    const { 
        createResponseOk, 
        createResponseError, 
        createResponseOkAfter, 
        createResponseErrorAfter,
        handleError
    } = useContext( CoreContext );

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
            handleError( error );
            createResponseErrorAfter();
        }
    } );

    return null;
}

function RetrieveRequest( { process, url, error }) {

    const { 
        retrieveResponseOk, 
        retrieveResponseError, 
        retrieveResponseOkAfter,
        retrieveResponseErrorAfter,
        handleError
    } = useContext( CoreContext );

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
            handleError( error );
            retrieveResponseErrorAfter();
        }
} );

    return null;
}

function UpdateRequest( { process, url, body, dataToDB, id, error }) {

    const { 
        updateResponseOk, 
        updateResponseError, 
        updateResponseOkAfter,
        updateResponseErrorAfter,
        handleError
    } = useContext( CoreContext );

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
            handleError( error );
            updateResponseErrorAfter();
        }
    } );

    return null;
}

function DeleteRequest( { process, url, body, dataToDB, id, error }) {

    const { 
        deleteResponseOk, 
        deleteResponseError, 
        deleteResponseOkAfter, 
        deleteResponseErrorAfter, 
        handleError
    } = useContext( CoreContext );

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
            handleError( error );
            deleteResponseErrorAfter();
        }
    } );

    return null;
}

function RetrieveManyRequest( { process, url, error } ) {

    const { 
        retrieveManyRequest,
        retrieveManyResponseWaiting,
        retrieveManyResponseOk,
        retrieveManyResponseError,
        retrieveManyResponseOkAfter,
        retrieveManyResponseErrorAfter,
        handleError
    } = useContext( CoreContext );

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
            handleError( error );
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