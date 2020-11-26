import React, { useContext } from 'react';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';

import { ToolBox } from './libs/ToolBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

import { Loader } from './libs/Loader';
import { EntryMenuTool, BlankEntryMenu, ExistsEntryMenu } from './EntryMenu';

import NoteForm from './notes/NoteForm';
import PaymentForm from './payments/PaymentForm';
import { dateToYYYYMMDD } from '../helpers/dates';
import { parseNoteToDB } from '../storage/notes/parsers';
import { parsePaymentToDB } from '../storage/payments/parsers';

import styled, { css } from 'styled-components';
import StyledRow from './libs/RowBox';
import { CRUDContextProvider, CRUDMenu, CreateRequest, UpdateRequest, DeleteRequest, RetrieveAllRequest } from './libs/CRUD';

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
                <Entry key={++inSequence} inSequence={inSequence} date={date} entry={entry} />
            ) ) }
        </List>
    );
}

const RowBox = StyledRow.RowBox;

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
`;

function Entry( { date, entry, inSequence } ) {

    const STATE = useContext( STATEContext )
    const { dispatch } = STATE;
    const payload = { date, entry, inSequence };


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

        REF.current._saved = { date, entry, inSequence };
    }

    const doCopy = ( date, entry, inSequence ) => {
        REF.current.cut = null;
        REF.current.copy = { date, inSequence };
        REF.current.paste = null;

        REF.current._saved = { date, entry, inSequence };
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

    const { genres, funds } = STATE.state.data.payments;

    REF.current._saved = { date, entry, inSequence };

    const parseDataToDB = entry.uiux.type.isPayment 
        ? () => parsePaymentToDB( { ...entry.data, date: dateToYYYYMMDD( date ), inSequence }, genres, funds )
        : () => parseNoteToDB( { ...entry.data, date: dateToYYYYMMDD( date ), inSequence } );

    const body = () => JSON.stringify( {
        oldSaved: { date: dateToYYYYMMDD( REF.current._saved.date ), inSequence: REF.current._saved.inSequence },
        newSaved: { date: dateToYYYYMMDD( date ), inSequence },
        data: parseDataToDB(),
    } );

    const strFrom = !entry.uiux.dateFrom || dateToYYYYMMDD( entry.uiux.dateFrom );
    const strTill = !entry.uiux.dateFrom || dateToYYYYMMDD( entry.uiux.dateTill );

    return (
        <CRUDContextProvider 
            dispatch={dispatch} 
            namespace={namespace} 
            payload={payload}
        >
            { entry.uiux.mode.isCreate ?
                <CreateRequest
                    process={entry.uiux.process}
                    url={ `/.netlify/functions/entry`}
                    body={body()}
                    dataToDB={parseDataToDB()}
                />
            : entry.uiux.mode.isUpdate ?
                <UpdateRequest 
                    process={entry.uiux.process}
                    url={`/.netlify/functions/entry?id=${entry.data.id}`}
                    body={body()}
                    dataToDB={parseDataToDB()}
                    id={entry.data.id}
                />
            : entry.uiux.mode.isDelete ?
                <DeleteRequest 
                    process={entry.uiux.process}
                    url={`/.netlify/functions/entry?id=${entry.data.id}`}
                    body={body()}
                    dataToDB={parseDataToDB()}
                    id={entry.data.id}
                />
            : entry.uiux.mode.isRetrieveAll ?
                <RetrieveAllRequest
                    process={entry.uiux.process}
                    url={`/.netlify/functions/entry?range=${strFrom}-${strTill}`}
                />
            : null }

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
                    {entry.uiux.status.isWaiting
                        ? <ToolBox><Loader /></ToolBox>
                        : entry.uiux.status.isSuspended
                        ? <ToolBox><FontAwesomeIcon icon={ faBan } className="icon" /></ToolBox>
                        : <EntryMenuTool date={date} entry={entry} inSequence={inSequence} />
                    }
                </RowMenu>

                {!entry.uiux.menu.isOpen ?
                    null
                : !entry.data.id ? 
                    <BlankEntryMenu 
                        date={date} 
                        entry={entry} 
                        inSequence={inSequence}
                        doPaste={doPaste}
                    />
                : 
                    <ExistsEntryMenu 
                        date={date} 
                        entry={entry} 
                        inSequence={inSequence}
                        doCut={doCut}
                        doCopy={doCopy}
                        doPaste={doPaste}
                    />
                }

                { !entry.uiux.form.isOpen ?
                    null
                : !entry.uiux.type.isPayment ?
                    <NoteForm 
                        date={date} 
                        entry={entry} 
                        inSequence={inSequence}
                    /> 
                :
                    <PaymentForm 
                        date={date} 
                        entry={entry} 
                        inSequence={inSequence} 
                    /> 
                }
            </RowBox> 
        </CRUDContextProvider>
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
