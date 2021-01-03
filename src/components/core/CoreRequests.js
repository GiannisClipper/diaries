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

function CreateRequest( { process, url, body, dataToDB }) {

    const { createResponseOk, createResponseError, createResponseAfter } = useContext( CoreContext );

    useEffect( () => {
        if ( process.isRequest ) {
            const args = { method: 'POST', body };
            const onDone = createResponseOk;
            const onError = createResponseError;
            const dataFromDB = res => ( { ...dataToDB, _id: res.insertedId } );
            doFetch( url, args, onDone, onError, dataFromDB );

        } else if ( process.isResponseOk ) {
            createResponseAfter();
        }
    } );

    return null;
}

function UpdateRequest( { process, url, body, dataToDB, id }) {

    const { updateResponseOk, updateResponseError, updateResponseAfter } = useContext( CoreContext );

    useEffect( () => {
        if ( process.isRequest ) {
            const args = { method: 'PUT', body };
            const onDone = updateResponseOk;
            const onError = updateResponseError;
            const dataFromDB = () => ( { ...dataToDB, _id: id } );
            doFetch( url, args, onDone, onError, dataFromDB );

        } else if ( process.isResponseOk ) {
            updateResponseAfter();
        }
    } );

    return null;
}

function DeleteRequest( { process, url, body, dataToDB, id }) {

    const { deleteResponseOk, deleteResponseError, deleteResponseAfter } = useContext( CoreContext );

    useEffect( () => {
        if ( process.isRequest ) {
            const args = { method: 'DELETE', body };
            const onDone = deleteResponseOk;
            const onError = deleteResponseError;
            const dataFromDB = () => ( { ...dataToDB, _id: id } );
            doFetch( url, args, onDone, onError, dataFromDB );

        } else if ( process.isResponseOk ) {
            deleteResponseAfter();
        }
    } );

    return null;
}

function RetrieveManyRequest( { process, url } ) {

    const { 
        retrieveManyRequest,
        retrieveManyResponseWaiting,
        retrieveManyResponseOk,
        retrieveManyResponseError,
        retrieveManyResponseAfter,
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
            retrieveManyResponseAfter();

        } else if ( process.isResponseError ) {
            // do nothing here

        }
    } );

    return null;
}

export { 
    SigninRequest,
    CreateRequest,
    UpdateRequest,
    DeleteRequest,
    RetrieveManyRequest
};