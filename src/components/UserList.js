import React, { useContext, useEffect } from 'react';
import '../styles/UserList.css';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';
import { realFetch, mockFetch } from '../helpers/customFetch';
import { parseUserToDB } from '../storage/parsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { Loader } from './libs/Loader';
import UserInit from './UserInit';
import UserMenu from './UserMenu';
import UserForm from './UserForm';

const namespace = 'users';

function UserList( { className } ) {

    const STATE = useContext( STATEContext );

    const { users } = STATE.state.data;

    useEffect( () => {
        console.log( 'Has rendered. ', 'UserList', users );
    } );

    let index = -1;

    return (
        <div className={`UserList ${className}`}>
            <UserInit />
            <div className="section">
                <span className="label">Χρήστες εφαρμογής</span>
                <ul>
                    { (console.log( 'users', users ), users.map( user => (
                        <User key={++index} index={index} users={users} />
                    ) ) ) }
                </ul>
            </div>
        </div>
    );
}

function User( { index, users } ) {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    const user = users[ index ];

    const openForm = mode => {
        REF.current.saved = { user };

        STATE.dispatch( { 
            namespace,
            type: 'OPEN_FORM',
            payload: { index, mode },
        } );
    }

    const closeForm = () => {
        STATE.dispatch( { 
            namespace,
            type: 'CLOSE_FORM',
            payload: { index },
        } );
    }

    const doValidation = index => {
        STATE.dispatch( { 
            namespace,
            type: 'DO_VALIDATION',
            payload: { index },
        } );
    }

    const validationDone = index => {
        STATE.dispatch( { 
            namespace,
            type: 'VALIDATION_DONE',
            payload: { index },
        } );
    }

    const validationError = index => {
        STATE.dispatch( { 
            namespace,
            type: 'VALIDATION_ERROR',
            payload: { index },
        } );
    }

    const doRequest = index => {
        STATE.dispatch( { 
            namespace,
            type: 'DO_REQUEST',
            payload: { index },
        } );
    }

    const createRequestDone = dataFromDB => {
        STATE.dispatch( { 
            namespace,
            type: 'CREATE_REQUEST_DONE',
            payload: { index, dataFromDB },
        } );
    }

    const createRequestError = () => {
        STATE.dispatch( { 
            namespace,
            type: 'CREATE_REQUEST_ERROR',
            payload: { index },
        } );
    }

    const updateRequestDone = dataFromDB => {
        STATE.dispatch( {
            namespace, 
            type: 'UPDATE_REQUEST_DONE',
            payload: { index, dataFromDB },
        } );
    }

    const updateRequestError = () => {
        STATE.dispatch( { 
            namespace,
            type: 'UPDATE_REQUEST_ERROR',
            payload: { index, saved: REF.current.saved },
        } );
    }

    const deleteRequestDone = dataFromDB => {
        STATE.dispatch( { 
            namespace,
            type: 'DELETE_REQUEST_DONE',
            payload: { index, dataFromDB },
        } );
    }

    const deleteRequestError = () => {
        STATE.dispatch( { 
            namespace,
            type: 'DELETE_REQUEST_ERROR',
            payload: {},
        } );
    }

    useEffect( () => {
        if ( user.uiux.process.isOnRequest ) {

            const doFetch = ( url, args, onDone, onError, dataFromDB ) => {
                console.log( 'Requesting... ', user.uiux.mode, user.data.id )

                realFetch( url, args )
                .then( res => {
                    alert( JSON.stringify( res ) );
                    onDone( dataFromDB( res ) );
                } )
                .catch( err => { 
                    alert( err );
                    onError();
                } );
            }

            const dataToDB = parseUserToDB( user.data );
            const body = JSON.stringify( { data: dataToDB } );
        
            if ( user.uiux.mode.isCreate ) {
                const url = `/.netlify/functions/user`;
                const args = { method: 'POST', body };
                const onDone = createRequestDone;
                const onError = createRequestError;
                const idInResponse = res => res.insertedId;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( url, args, onDone, onError, dataFromDB );

            } else if ( user.uiux.mode.isUpdate ) {
                const url = `/.netlify/functions/user?id=${user.data.id}`;
                const args = { method: 'PUT', body };
                const onDone = updateRequestDone;
                const onError = updateRequestError;
                const idInResponse = res => user.data.id;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( url, args, onDone, onError, dataFromDB );

            } else if ( user.uiux.mode.isDelete ) {
                const url = `/.netlify/functions/user?id=${user.data.id}`;
                const args = { method: 'DELETE', body };
                const onDone = deleteRequestDone;
                const onError = deleteRequestError;
                const idInResponse = () => user.data.id;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( url, args, onDone, onError, dataFromDB );
            }
        }
    } );

    const mode = !user.data.id ? { isCreate: true } : { isUpdate: true };

    return (
        <li 
            className={`User`}
            key={index}
        >
            <div className='data' title={`${user.data.id}`}>
                <span className='username'>{user.data.username}</span>
                <span className='email'>{user.data.email}</span>
                <span className='remark'>{user.data.remark}</span>
            </div>

            {user.uiux.process.isOnValidation || user.uiux.process.isOnRequest
                ? <Loader />
                : user.uiux.status.isSuspended
                ? <FontAwesomeIcon icon={ faBan } className="icon" />
                : <UserMenu openForm={openForm} mode={mode} />
            }

            {user.uiux.form.isOpen 
                ? 
                <UserForm 
                    users={users} 
                    index={index} 
                    closeForm={closeForm}
                    doValidation={doValidation}
                    validationDone={validationDone}
                    validationError={validationError}
                    doRequest={doRequest}
                /> 
                : 
                null
            }

        </li> 
    );
}

export default UserList;