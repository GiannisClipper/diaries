import React, { useEffect, useRef, useContext } from 'react';
import '../styles/EntryList.css';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';
import { dateToYYYYMMDD } from '../helpers/dates';
import { realFetch, mockFetch } from '../helpers/customFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Loader } from './Loader';
import EntryMenu from './EntryMenu';
import EntryForm from './EntryForm';

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

    REF.current.openCreateEntryForm = ( event, date, entry, inSequence ) => {
        REF.current.saved = { date, entry, inSequence };

        STATE.dispatch( { 
            type: 'OPEN_ENTRY_FORM',
            payload: { mode: { isCreate: true }, date, entry, inSequence },
        } );
    }

    REF.current.openUpdateEntryForm = ( event, date, entry, inSequence ) => {
        REF.current.saved = { date, entry, inSequence };

        STATE.dispatch( { 
            type: 'OPEN_ENTRY_FORM',
            payload: { mode: { isUpdate: true }, date, entry, inSequence },
        } );
    }

    REF.current.openDeleteEntryForm = ( event, date, entry, inSequence ) => {
        REF.current.saved = { date, entry, inSequence };

        STATE.dispatch( { 
            type: 'OPEN_ENTRY_FORM',
            payload: { mode: { isDelete: true }, date, entry, inSequence },
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

    const className = entry.data.id ? 'Entry' : 'Entry init';
    let draggable = entry.data.id && !entry.uiux.form.isOpen ? 'true' : 'false';
    let onDragStart = entry.data.id ? event => dragStart( event, date, entry, inSequence ) : null;
    let onDragOver = event => allowDrop( event );
    let onDrop = event => doDrop( event, date, inSequence );

    if ( entry.uiux.isUnderProcess ) {
        draggable = null;
        onDragStart = null;
        onDragOver = null;
        onDrop = null;
    }

    return (
        <li 
            className={className}
            key={inSequence}
            draggable={draggable}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            //onDoubleClick={event => REF.current.openForm( event, date, inSequence )}
        >
            <div className='data' title={`${entry.data.date}, ${inSequence}, ${entry.data.inSequence}, ${entry.data.id}`}>
                {entry.data.note}
            </div>

            {entry.uiux.db.isOnRequest
                ? <Loader />
                : entry.uiux.isUnderProcess
                ? null
                : <MenuTool date={date} entry={entry} inSequence={inSequence} />
            }

            {entry.uiux.menu.isOpen ? <EntryMenu date={date} entry={entry} inSequence={inSequence} /> : null}

            {entry.uiux.form.isOpen ? <EntryForm date={date} entry={entry} inSequence={inSequence} /> : null}

        </li> 
    );
}

function MenuTool( { date, entry, inSequence } ) {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    REF.current.openMenu = ( event, date, inSequence ) => {
        //event.stopPropagation();

        STATE.dispatch( { 
            type: 'OPEN_ENTRY_MENU',
            payload: { date, inSequence },
        } );
    }

    REF.current.closeMenu = ( event, date, inSequence ) => {
        //event.stopPropagation();

        STATE.dispatch( { 
            type: 'CLOSE_ENTRY_MENU',
            payload: { date, inSequence },
        } );
    }

    const menuToolRef = useRef( null );

    return (
        <div
            className='MenuTool'
            onClick={event => {
                REF.current.menuTool = menuToolRef.current;
                REF.current.openMenu( event, date, inSequence );
            }}
            ref={menuToolRef}
        >
            <FontAwesomeIcon icon={ faEllipsisH } className="icon" />
        </div>
    );
}

export default EntryList;
