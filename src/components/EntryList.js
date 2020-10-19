import React, { useEffect, useContext } from 'react';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';
import { dateToYYYYMMDD } from '../helpers/dates';
import { realFetch, mockFetch } from '../helpers/customFetch';
import { parseNoteToDB } from '../storage/notes/parsers';
import { parsePaymentToDB } from '../storage/payments/parsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

import { Loader } from './libs/Loader';
import { EntryMenuTool, BlankEntryMenu, ExistsEntryMenu } from './EntryMenu';
import NoteForm from './notes/NoteForm';
import PaymentForm from './payments/PaymentForm';
import styled, { css } from 'styled-components';
import StyledRow from './libs/RowBox';

const namespace = 'entries';

const List = styled.ul`
    display: inline-block;
    vertical-align: top;
    width: 100%;
`;

function EntryList( { date, entries } ) {

    let inSequence = -1;

    return (
            <List>
                { entries.map( entry => (
                    <Entry date={date} entry={entry} inSequence={++inSequence} key={inSequence} />
                ) ) }
            </List>
    );
}

const RowBox = styled( StyledRow.RowBox )`
    margin-top: .5em;
    margin-bottom: .5em;
    background-color: lightskyblue;
    .icon {
        color: lightcoral;
    }
`;

const RowValue = styled( StyledRow.RowValue )`
    width: calc( 100% - 2em );

    ${props => props.draggable && css`
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
    `}
`;

const RowMenu = styled( StyledRow.RowMenu )`
    width: 2em;
    .icon {
        color: lightcoral;
    }
`;

function Entry( { date, entry, inSequence } ) {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    const dragStart = ( event, date, entry, inSequence ) => {
        doCut( date, entry, inSequence );
        event.dataTransfer.effectAllowed = 'move';
    }

    const allowDrop = event => {
        event.preventDefault();
    }

    const doDrop = ( event, date, inSequence ) => {
        event.preventDefault();
        doPaste( date, entry, inSequence );
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

    const doValidation = ( date, inSequence ) => {
        STATE.dispatch( { 
            namespace,
            type: 'DO_VALIDATION',
            payload: { date, inSequence },
        } );
    }

    const validationDone = ( date, inSequence ) => {
        STATE.dispatch( { 
            namespace,
            type: 'VALIDATION_DONE',
            payload: { date, inSequence },
        } );
    }

    const validationError = ( date, inSequence ) => {
        STATE.dispatch( { 
            namespace,
            type: 'VALIDATION_ERROR',
            payload: { date, inSequence },
        } );
    }

    const doRequest = ( date, inSequence ) => {
        STATE.dispatch( { 
            namespace,
            type: 'DO_REQUEST',
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
        if ( entry.uiux.process.isOnRequest ) {

            const doFetch = ( date, inSequence, url, args, onDone, onError, dataFromDB ) => {
                console.log( 'Requesting... ', entry.uiux.mode, entry.data.id )

                realFetch( url, args )
                .then( res => {
                    alert( JSON.stringify( res ) );
                    onDone( date, inSequence, dataFromDB( res ) );
                } )
                .catch( err => { 
                    alert( err );
                    onError( date, inSequence, {} );
                } );
            }

            const { genres, funds } = STATE.state.data.payments;

            const dataToDB = entry.uiux.type.isPayment
                ? parsePaymentToDB( { ...entry.data, date: dateToYYYYMMDD( date ), inSequence }, genres, funds )
                : parseNoteToDB( { ...entry.data, date: dateToYYYYMMDD( date ), inSequence } );

            const body = () => JSON.stringify( {
                oldSaved: { date: dateToYYYYMMDD( REF.current.saved.date ), inSequence: REF.current.saved.inSequence },
                newSaved: { date: dateToYYYYMMDD( date ), inSequence },
                data: dataToDB
            } );

            if ( entry.uiux.mode.isCreate ) {
                const url = `/.netlify/functions/entry`;
                const args = { method: 'POST', body: body() };
                const onDone = createRequestDone;
                const onError = createRequestError;
                const idInResponse = res => res.insertedId;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( date, inSequence, url, args, onDone, onError, dataFromDB );

            } else if ( entry.uiux.mode.isUpdate ) {
                const url = `/.netlify/functions/entry?id=${entry.data.id}`;
                const args = { method: 'PUT', body: body() };
                const onDone = updateRequestDone;
                const onError = updateRequestError;
                const idInResponse = () => entry.data.id;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( date, inSequence, url, args, onDone, onError, dataFromDB );

            } else if ( entry.uiux.mode.isDelete ) {
                const url = `/.netlify/functions/entry?id=${entry.data.id}`;
                const args = { method: 'DELETE', body: body() };
                const onDone = deleteRequestDone;
                const onError = deleteRequestError;
                const idInResponse = () => entry.data.id;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( date, inSequence, url, args, onDone, onError, dataFromDB );
            }
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

    return (
        <RowBox
            key={inSequence}
            draggable={draggable}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <RowValue
                draggable={draggable}
                title={`${entry.data.date}, ${inSequence}, ${entry.data.inSequence}, ${entry.data.id}`}
            >
                <EntryRepr entry={entry} />
            </RowValue>

            <RowMenu>
                {entry.uiux.process.isOnRequest
                    ? <Loader />
                    : entry.uiux.status.isSuspended
                    ? <FontAwesomeIcon icon={ faBan } className="icon" />
                    : <EntryMenuTool date={date} entry={entry} inSequence={inSequence} openMenu={openMenu} />
                }
            </RowMenu>

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
                <ExistsEntryMenu 
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
                    closeForm={closeForm}
                    doValidation={doValidation}
                    validationDone={validationDone}
                    validationError={validationError}
                    doRequest={doRequest}
                /> 
                : 
                <PaymentForm 
                    date={date} 
                    entry={entry} 
                    inSequence={inSequence} 
                    closeForm={closeForm}
                    doValidation={doValidation}
                    validationDone={validationDone}
                    validationError={validationError}
                    doRequest={doRequest}
                /> 
            }

        </RowBox> 
    );
}

const EntryRepr = ( { entry } ) => {

    const { data } = entry;
    let repr = '';

    if ( data.type === 'note' ) {
        repr += data.note;

    } else if ( data.type === 'payment' ) {
        repr += data.incoming ? `Είσπραξη ${data.incoming} ` : '';
        repr += data.outgoing ? `Πληρωμή ${data.outgoing} ` : '';
        repr += `(${data.fund_name}) ${data.genre_name}`;
        repr += data.remark ? `-${data.remark}` : '';
    }

    return <>{repr}</>
}

export default EntryList;
