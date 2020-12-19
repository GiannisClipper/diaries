import React, { useContext, useRef, useEffect } from 'react';
import { STATEContext } from './STATEContext';

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
import { CopyPasteContext } from './libs/CopyPaste';
import { CRUDContext, CRUDContextProvider, RetrieveManyRequest, CreateRequest, UpdateRequest, DeleteRequest } from './libs/CRUD';

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
            { entries.map( entry =>
                <EntryContext key={++inSequence} inSequence={inSequence} date={date} entry={entry} />
            ) }
        </List>
    );
}

const EntryContext = ( { date, inSequence, entry } ) => {

    const STATE = useContext( STATEContext )
    const { state, dispatch } = STATE;
    const { genres, funds } = state.data.payments;

    const saved = useRef( { date, inSequence, entry } );

    const parseDataToDB = entry.uiux.type.isPayment 
        ? 
        () => parsePaymentToDB(
                { ...entry.data, date: dateToYYYYMMDD( date ), inSequence }, 
                genres, 
                funds 
            )
        : 
        () => parseNoteToDB( 
                { ...entry.data, date: dateToYYYYMMDD( date ), inSequence },
            );

    const body = () => JSON.stringify( {
        old: { date: dateToYYYYMMDD( saved.date ), inSequence: saved.inSequence },
        new: { date: dateToYYYYMMDD( date ), inSequence },
        data: parseDataToDB(),
    } );

    const strDateFrom = dateToYYYYMMDD( entry.uiux.dateFrom );
    const strDateTill = dateToYYYYMMDD( entry.uiux.dateTill );

    const payload = { date, inSequence, entry };

    //useEffect( () =>  console.log( 'Has rendered. ', 'EntryContext' ) );

    return (
        <CRUDContextProvider 
            dispatch={dispatch} 
            namespace={namespace} 
            payload={payload}
        >
            { entry.uiux.mode.isRetrieveMany && entry.uiux.process.isResponseOk ?
                <RetrieveManyResponseSetup />

            : entry.uiux.mode.isRetrieveMany ?
                <RetrieveManyRequest
                    process={entry.uiux.process}
                    url={`/.netlify/functions/entry?range=${strDateFrom}-${strDateTill}`}
                />
            : entry.uiux.mode.isCreate ?
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
            : null }

            <Entry inSequence={inSequence} date={date} entry={entry} />

        </CRUDContextProvider>
    )
}

function RetrieveManyResponseSetup() {

    const { retrieveManyResponseSetup, retrieveManyResponseError } = useContext( CRUDContext );
    const STATE = useContext( STATEContext )

    useEffect( () => {
        const { init } = STATE.state.uiux;

        const process1 = init.payments.genres.process;
        const process2 = init.payments.funds.process;

        if ( process1.isResponseOk && process2.isResponseOk ) {
            retrieveManyResponseSetup()

        } else if ( process1.isResponseError || process2.isResponseError ) {
            retrieveManyResponseError()
        }
    } );

    return null;
};

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

const Entry = React.memo( ( { date, inSequence, entry } ) => {

    const { doCut, doPaste } = useContext( CopyPasteContext );

    let draggable, onDragStart, onDragOver, onDrop;

    if ( !entry.uiux.form.isOpen && !entry.uiux.process.isResponseError ) {

        if ( entry.data.id ) {  // no drag empty rows

            draggable = 'true';

            onDragStart = event => {
                event.dataTransfer.effectAllowed = 'move';
                doCut( { date, entry, inSequence } );
            }
        }

        onDragOver = event => {  // allowDrop
            event.preventDefault();
        }

        onDrop = event => {
            event.preventDefault();
            doPaste( { date, entry, inSequence } );
        }
    }

    useEffect( () =>  console.log( 'Has rendered. ', 'Entry' ) );

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
                {entry.uiux.process.isValidation || 
                entry.uiux.process.isRequestBefore ||
                entry.uiux.process.isRequest ||
                entry.uiux.process.isResponseWaiting ||
                entry.uiux.process.isResponseOk ?
                    <ToolBox><Loader /></ToolBox>
                : entry.uiux.process.isResponseError ?
                    <ToolBox><FontAwesomeIcon icon={ faBan } className="icon" /></ToolBox>
                : 
                    <EntryMenuTool date={date} entry={entry} inSequence={inSequence} />
                }
            </RowMenu>

            {!entry.uiux.menu.isOpen ?
                null
            : !entry.data.id ? 
                <BlankEntryMenu 
                    date={date} 
                    entry={entry} 
                    inSequence={inSequence}
                />
            : 
                <ExistsEntryMenu 
                    date={date} 
                    entry={entry} 
                    inSequence={inSequence}
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
    );
} );

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
