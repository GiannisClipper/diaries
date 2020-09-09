import React, { useEffect, useContext } from 'react';
import '../styles/EntryList.css';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';
import { dateToYYYYMMDD } from '../helpers/dates';
import { realFetch, mockFetch } from '../helpers/customFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

import { Loader } from './libs/Loader';
import { EntryMenuTool, BlankEntryMenu, EntryMenu } from './EntryMenu';
import NoteForm from './NoteForm';
import PaymentForm from './PaymentForm';

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

    REF.current.cutEntry = ( date, entry, inSequence ) => {
        REF.current.cut = { date, inSequence };
        REF.current.copy = null;
        REF.current.paste = null;

        REF.current.saved = { date, entry, inSequence };
    }

    REF.current.copyEntry = ( date, entry, inSequence ) => {
        REF.current.cut = null;
        REF.current.copy = { date, inSequence };
        REF.current.paste = null;

        REF.current.saved = { date, entry, inSequence };
    }

    REF.current.pasteEntry = ( date, entry, inSequence ) => {
        REF.current.paste = { date, inSequence };

        const { cut, copy, paste } = REF.current;

        if ( cut ) {
            STATE.dispatch( { type: 'MOVE_ENTRY', payload: { cut, paste } } );
            REF.current.copy = { ...cut };
            REF.current.cut = null;

        } else if ( copy ) {
            STATE.dispatch( { type: 'COPY_ENTRY', payload: { copy, paste } } );
        }
    }

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

    REF.current.openEntryForm = ( event, date, entry, inSequence, type, mode ) => {
        REF.current.saved = { date, entry, inSequence };

        STATE.dispatch( { 
            type: 'OPEN_ENTRY_FORM',
            payload: { date, entry, inSequence, type, mode },
        } );
    }


    REF.current.closeEntryForm = ( event, date, inSequence ) => {
        //event.stopPropagation()
        STATE.dispatch( { 
            type: 'CLOSE_ENTRY_FORM',
            payload: { date, inSequence },
        } );
    }

    REF.current.entryRequest = ( date, inSequence ) => {
        STATE.dispatch( { 
            type: 'ENTRY_REQUEST',
            payload: { date, inSequence },
        } );
    }

    REF.current.createEntryRequestDone = ( date, inSequence, dataFromDB ) => {

        STATE.dispatch( { 
            type: 'CREATE_ENTRY_REQUEST_DONE',
            payload: { date, inSequence, dataFromDB },
        } );
    }

    REF.current.createEntryRequestError = ( date, inSequence ) => {

        STATE.dispatch( { 
            type: 'CREATE_ENTRY_REQUEST_ERROR',
            payload: { date, inSequence },
        } );
    }

    REF.current.updateEntryRequestDone = ( date, inSequence, dataFromDB ) => {

        STATE.dispatch( { 
            type: 'UPDATE_ENTRY_REQUEST_DONE',
            payload: { date, inSequence, dataFromDB },
        } );
    }

    REF.current.updateEntryRequestError = ( date, inSequence ) => {

        STATE.dispatch( { 
            type: 'UPDATE_ENTRY_REQUEST_ERROR',
            payload: { date, inSequence, saved: REF.current.saved },
        } );
    }

    REF.current.deleteEntryRequestDone = ( date, inSequence, dataFromDB ) => {

        STATE.dispatch( { 
            type: 'DELETE_ENTRY_REQUEST_DONE',
            payload: { date, inSequence, dataFromDB },
        } );
    }

    REF.current.deleteEntryRequestError = ( date, inSequence ) => {

        STATE.dispatch( { 
            type: 'DELETE_ENTRY_REQUEST_ERROR',
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

            const requestArgs = {};

            if ( entry.uiux.mode.isCreate ) {
                requestArgs.url = `/.netlify/functions/create-entry`;
                requestArgs.method = 'POST';
                requestArgs.idInResponse = res => res.insertedId;
                requestArgs.onDone = REF.current.createEntryRequestDone;
                requestArgs.onError = REF.current.createEntryRequestError;

            } else if ( entry.uiux.mode.isUpdate ) {
                requestArgs.url = `/.netlify/functions/update-entry?id=${entry.data.id}`;
                requestArgs.method = 'PUT';
                requestArgs.idInResponse = () => entry.data.id;
                requestArgs.onDone = REF.current.updateEntryRequestDone;
                requestArgs.onError = REF.current.updateEntryRequestError;

            } else if ( entry.uiux.mode.isDelete ) {
                requestArgs.url = `/.netlify/functions/delete-entry?id=${entry.data.id}`;
                requestArgs.method = 'DELETE';
                requestArgs.idInResponse = () => entry.data.id;
                requestArgs.onDone = REF.current.deleteEntryRequestDone;
                requestArgs.onError = REF.current.deleteEntryRequestError;
            }

            realFetch( requestArgs.url , {
                method: requestArgs.method,
                body: JSON.stringify( {
                    oldSaved: { date: dateToYYYYMMDD( REF.current.saved.date ), inSequence: REF.current.saved.inSequence },
                    newSaved: { date: dateToYYYYMMDD( date ), inSequence },
                    data: dataToDB
                } )
            } )
            .then( res => {
                alert( JSON.stringify( res ) );
                const dataFromDB = { ...dataToDB, _id: requestArgs.idInResponse( res ) };
                requestArgs.onDone( date, inSequence, dataFromDB );
            } )
            .catch( err => { 
                alert( err );
                requestArgs.onError( date, inSequence, {} );
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
                : <EntryMenuTool date={date} entry={entry} inSequence={inSequence} />
            }

            {!entry.uiux.menu.isOpen 
                ? null
                : !entry.data.id
                ? <BlankEntryMenu date={date} entry={entry} inSequence={inSequence} />
                : <EntryMenu date={date} entry={entry} inSequence={inSequence} />
            }

            {!entry.uiux.form.isOpen 
                ? null
                : !entry.uiux.type.isPayment
                ? <NoteForm date={date} entry={entry} inSequence={inSequence} /> 
                : <PaymentForm date={date} entry={entry} inSequence={inSequence} /> 
            }

        </li> 
    );
}

export default EntryList;
