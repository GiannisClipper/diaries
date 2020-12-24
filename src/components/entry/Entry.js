import React, { useContext, useRef, useEffect } from 'react';
import { STATEContext } from '../STATEContext';
import { DateContext } from '../date/DateContext';

import { ToolBox } from '../libs/ToolBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

import { Loader } from '../libs/Loader';
import { EntryMenuTool, BlankEntryMenu, ExistsEntryMenu } from './EntryMenu';
import { EntryRepr } from './EntryRepr';

import NoteForm from '../note/NoteForm';
import PaymentForm from '../payment/PaymentForm';
import { dateToYYYYMMDD } from '../../helpers/dates';
import { parseNoteToDB } from '../../storage/note/parsers';
import { parsePaymentToDB } from '../../storage/payment/parsers';

import styled, { css } from 'styled-components';
import StyledRow from '../libs/RowBox';
import { CopyPasteContext } from '../libs/CopyPaste';
import { CRUDContext, CRUDContextProvider, RetrieveManyRequest, CreateRequest, UpdateRequest, DeleteRequest } from '../libs/CRUD';


const namespace = 'entries';

const List = styled.ul`
    display: inline-block;
    vertical-align: top;
    width: 100%;
`;

function Entries() {

    const { date, entries } = useContext( DateContext ).state;

    let inSequence = 0;
    console.log( entries)
    return (
        <List>
            { entries.map( entry =>
                <EntryContext
                    key={ inSequence++ }
                    date={ date } 
                    inSequence={ inSequence } 
                    entry={ entry } />
            ) }
        </List>
    );
}

const EntryContext = ( { date, inSequence, entry } ) => {

    const STATE = useContext( STATEContext )
    const { state, dispatch } = STATE;
    const { genres, funds } = state.data.payments;

    const saved = useRef( { date, inSequence, entry } );

    const parseDataToDB = entry._uiux.type.isPayment 
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

    const strDateFrom = dateToYYYYMMDD( entry._uiux.dateFrom );
    const strDateTill = dateToYYYYMMDD( entry._uiux.dateTill );

    const payload = { date, inSequence, entry };

    //useEffect( () =>  console.log( 'Has rendered. ', 'EntryContext' ) );

    return (
        <CRUDContextProvider 
            dispatch={dispatch} 
            namespace={namespace} 
            payload={payload}
        >
            { entry._uiux.mode.isRetrieveMany && entry._uiux.process.isResponseOk ?
                <RetrieveManyResponseSetup />

            : entry._uiux.mode.isRetrieveMany ?
                <RetrieveManyRequest
                    process={entry._uiux.process}
                    url={`/.netlify/functions/entry?range=${strDateFrom}-${strDateTill}`}
                />
            : entry._uiux.mode.isCreate ?
                <CreateRequest
                    process={entry._uiux.process}
                    url={ `/.netlify/functions/entry`}
                    body={body()}
                    dataToDB={parseDataToDB()}
                />
            : entry._uiux.mode.isUpdate ?
                <UpdateRequest 
                    process={entry._uiux.process}
                    url={`/.netlify/functions/entry?id=${entry.data.id}`}
                    body={body()}
                    dataToDB={parseDataToDB()}
                    id={entry.data.id}
                />
            : entry._uiux.mode.isDelete ?
                <DeleteRequest 
                    process={entry._uiux.process}
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

    if ( !entry._uiux.form.isOpen && !entry._uiux.process.isResponseError ) {

        if ( entry.id ) {  // no drag empty rows

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

    // useEffect( () =>  console.log( 'Has rendered. ', 'Entry' ) );

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
                title={`${entry.date}, ${inSequence}, ${entry.inSequence}, ${entry.id}`}
            >
                <EntryRepr entry={entry} />
            </RowValue>

            <RowMenu>
                {entry._uiux.process.isValidation || 
                entry._uiux.process.isRequestBefore ||
                entry._uiux.process.isRequest ||
                entry._uiux.process.isResponseWaiting ||
                entry._uiux.process.isResponseOk ?
                    <ToolBox><Loader /></ToolBox>
                : entry._uiux.process.isResponseError ?
                    <ToolBox><FontAwesomeIcon icon={ faBan } className="icon" /></ToolBox>
                : 
                    <EntryMenuTool date={date} entry={entry} inSequence={inSequence} />
                }
            </RowMenu>

            {!entry._uiux.menu.isOpen ?
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

            { !entry._uiux.form.isOpen ?
                null
            : !entry._uiux.type.isPayment ?
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

export { Entry, Entries };
