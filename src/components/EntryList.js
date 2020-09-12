import React, { useEffect, useContext } from 'react';
import '../styles/EntryList.css';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';
import { dateToYYYYMMDD } from '../helpers/dates';
import { realFetch, mockFetch } from '../helpers/customFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

import { Loader } from './libs/Loader';
import { EntryMenuTool, BlankEntryMenu, ExistEntryMenu } from './EntryMenu';
import NoteForm from './NoteForm';
import PaymentForm from './PaymentForm';

const namespace = 'entries';

function EntryList( { date, entries } ) {

    let inSequence = -1;

    return (
        <div className="EntryList">
            <ul>
                { entries.map( entry => (
                    <Entry date={date} entry={entry} inSequence={++inSequence} />
                ) ) }
            </ul>
        </div>
    );
}

function Entry( { date, entry, inSequence } ) {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    const dragStart = ( event, date, entry, inSequence ) => {
        REF.current.cutEntry( date, entry, inSequence );
        event.dataTransfer.effectAllowed = 'move';
    }

    const allowDrop = event => {
        event.preventDefault();
    }

    const doDrop = ( event, date, inSequence ) => {
        event.preventDefault();
        REF.current.pasteEntry( date, entry, inSequence );
    }

    const doCut = ( date, entry, inSequence ) => {
        REF.current.cut = { date, inSequence };
        REF.current.copy = null;
        REF.current.paste = null;

        REF.current.saved = { date, entry, inSequence };
    }

    const doCopy = ( date, entry, inSequence ) => {
        REF.current.cut = null;
        REF.current.copy = { date, inSequence };
        REF.current.paste = null;

        REF.current.saved = { date, entry, inSequence };
    }

    const doPaste = ( date, entry, inSequence ) => {
        REF.current.paste = { date, inSequence };

        const { cut, copy, paste } = REF.current;

        if ( cut ) {
            STATE.dispatch( { namespace, type: 'MOVE_ENTRY', payload: { cut, paste } } );
            REF.current.copy = { ...cut };
            REF.current.cut = null;

        } else if ( copy ) {
            STATE.dispatch( { namespace, type: 'COPY_ENTRY', payload: { copy, paste } } );
        }
    }

    const openMenu = ( event, date, inSequence ) => {
        STATE.dispatch( { 
            namespace,
            type: 'OPEN_MENU',
            payload: { date, inSequence },
        } );
    }

    const closeMenu = ( event, date, inSequence ) => {
        STATE.dispatch( { 
            namespace,
            type: 'CLOSE_MENU',
            payload: { date, inSequence },
        } );
    }

    const openForm = ( event, date, entry, inSequence, type, mode ) => {
        REF.current.saved = { date, entry, inSequence };

        STATE.dispatch( { 
            namespace,
            type: 'OPEN_FORM',
            payload: { date, entry, inSequence, type, mode },
        } );
    }


    const closeForm = ( event, date, inSequence ) => {
        STATE.dispatch( { 
            namespace,
            type: 'CLOSE_FORM',
            payload: { date, inSequence },
        } );
    }

    const doRequest = ( date, inSequence ) => {
        STATE.dispatch( { 
            namespace,
            type: 'REQUEST',
            payload: { date, inSequence },
        } );
    }

    const createRequestDone = ( date, inSequence, dataFromDB ) => {

        STATE.dispatch( { 
            namespace,
            type: 'CREATE_REQUEST_DONE',
            payload: { date, inSequence, dataFromDB },
        } );
    }

    const createRequestError = ( date, inSequence ) => {

        STATE.dispatch( { 
            namespace,
            type: 'CREATE_REQUEST_ERROR',
            payload: { date, inSequence },
        } );
    }

    const updateRequestDone = ( date, inSequence, dataFromDB ) => {

        STATE.dispatch( {
            namespace, 
            type: 'UPDATE_REQUEST_DONE',
            payload: { date, inSequence, dataFromDB },
        } );
    }

    const updateRequestError = ( date, inSequence ) => {

        STATE.dispatch( { 
            namespace,
            type: 'UPDATE_REQUEST_ERROR',
            payload: { date, inSequence, saved: REF.current.saved },
        } );
    }

    const deleteRequestDone = ( date, inSequence, dataFromDB ) => {

        STATE.dispatch( { 
            namespace,
            type: 'DELETE_REQUEST_DONE',
            payload: { date, inSequence, dataFromDB },
        } );
    }

    const deleteRequestError = ( date, inSequence ) => {

        STATE.dispatch( { 
            namespace,
            type: 'DELETE_REQUEST_ERROR',
            payload: { date, inSequence },
        } );
    }

    useEffect( () => {
        if ( entry.uiux.db.isOnRequest && Object.keys( entry.uiux.mode ).length !== 0 ) {
            console.log( 'Requesting... ', entry.uiux.mode, entry.data.id )

            const dataToDB = {
                date: dateToYYYYMMDD( date ),
                note: entry.data.note,
                inSequence: inSequence
            };

            let url, method, idInResponse, onDone, onError;

            if ( entry.uiux.mode.isCreate ) {
                url = `/.netlify/functions/create-entry`;
                method = 'POST';
                idInResponse = res => res.insertedId;
                onDone = createRequestDone;
                onError = createRequestError;

            } else if ( entry.uiux.mode.isUpdate ) {
                url = `/.netlify/functions/update-entry?id=${entry.data.id}`;
                method = 'PUT';
                idInResponse = () => entry.data.id;
                onDone = updateRequestDone;
                onError = updateRequestError;

            } else if ( entry.uiux.mode.isDelete ) {
                url = `/.netlify/functions/delete-entry?id=${entry.data.id}`;
                method = 'DELETE';
                idInResponse = () => entry.data.id;
                onDone = deleteRequestDone;
                onError = deleteRequestError;
            }

            realFetch( url , {
                method: method,
                body: JSON.stringify( {
                    oldSaved: { date: dateToYYYYMMDD( REF.current.saved.date ), inSequence: REF.current.saved.inSequence },
                    newSaved: { date: dateToYYYYMMDD( date ), inSequence },
                    data: dataToDB
                } )
            } )
            .then( res => {
                alert( JSON.stringify( res ) );
                const dataFromDB = { ...dataToDB, _id: idInResponse( res ) };
                onDone( date, inSequence, dataFromDB );
            } )
            .catch( err => { 
                alert( err );
                onError( date, inSequence, {} );
            } );
        }

    } );

    let draggable = entry.data.id ? 'true' : null;
    let onDragStart = entry.data.id ? event => dragStart( event, date, entry, inSequence ) : null;
    let onDragOver = event => allowDrop( event );
    let onDrop = event => doDrop( event, date, inSequence );

    if ( entry.uiux.form.isOpen ) {
        draggable = null;
    }

    if ( entry.uiux.status.isSuspended ) {
        draggable = null;
        onDragStart = null;
        onDragOver = null;
        onDrop = null;
    }

    const className = draggable ? ' draggable' : '';

    return (
        <li 
            className={`Entry ${className}`}
            key={inSequence}
            draggable={draggable}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <div className='data' title={`${entry.data.date}, ${inSequence}, ${entry.data.inSequence}, ${entry.data.id}`}>
                {entry.data.note}
            </div>

            {entry.uiux.db.isOnRequest
                ? <Loader />
                : entry.uiux.status.isSuspended
                ? <FontAwesomeIcon icon={ faBan } className="icon" />
                : <EntryMenuTool date={date} entry={entry} inSequence={inSequence} openMenu={openMenu} />
            }

            {!entry.uiux.menu.isOpen 
                ? null
                : !entry.data.id
                ? 
                <BlankEntryMenu 
                    date={date} 
                    entry={entry} 
                    inSequence={inSequence}
                    openForm={openForm}
                    closeMenu={closeMenu}
                    doPaste={doPaste}
                />
                : 
                <ExistEntryMenu 
                    date={date} 
                    entry={entry} 
                    inSequence={inSequence}
                    openForm={openForm}
                    closeMenu={closeMenu}
                    doCut={doCut}
                    doCopy={doCopy}
                    doPaste={doPaste}
                />
            }

            {!entry.uiux.form.isOpen 
                ? null
                : !entry.uiux.type.isPayment
                ?
                <NoteForm 
                    date={date} 
                    entry={entry} 
                    inSequence={inSequence} 
                    doRequest={doRequest}
                    closeForm={closeForm}
                /> 
                : 
                <PaymentForm 
                    date={date} 
                    entry={entry} 
                    inSequence={inSequence} 
                    doRequest={doRequest}
                    closeForm={closeForm}
                /> 
            }

        </li> 
    );
}

export default EntryList;
