import React, { useContext, useRef, useEffect } from 'react';
import { AppContext } from '../app/AppContext';
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
import { CRUDContextProvider, CreateRequest, UpdateRequest, DeleteRequest } from '../libs/CRUD';

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

const Entry = ( { inSequence } ) => {

    const { payments } = useContext( AppContext ).state;
    const { genres, funds } = payments;

    const { state, dispatch } = useContext( DateContext );
    const { date, entries } = state;
    const entry = entries[ inSequence ];
    const { _uiux } = entry;


    const { doCut, doPaste } = useContext( CopyPasteContext );

    let draggable, onDragStart, onDragOver, onDrop;

    if ( ! _uiux.form.isOpen && ! _uiux.process.isResponseError ) {

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

    const _saved = useRef( { date, inSequence } );

    const parseDataToDB = _uiux.type.isPayment 
        ? 
        () => parsePaymentToDB(
                { ...entry, date: dateToYYYYMMDD( date ), inSequence }, 
                genres, 
                funds 
            )
        : 
        () => parseNoteToDB( 
                { ...entry, date: dateToYYYYMMDD( date ), inSequence },
            );

    const body = () => JSON.stringify( {
        old: { date: dateToYYYYMMDD( _saved.current.date ), inSequence: _saved.current.inSequence },
        new: { date: dateToYYYYMMDD( date ), inSequence },
        data: parseDataToDB(),
    } );

    const payload = { inSequence, genres, funds };


    // useEffect( () =>  console.log( 'Has rendered. ', 'Entry' ) );

    return (
        <CRUDContextProvider 
            dispatch={ dispatch } 
            payload={ payload }
        >

            { _uiux.mode.isCreate ?
                <CreateRequest
                    process={ _uiux.process }
                    url={ `/.netlify/functions/entry` }
                    body={ body() }
                    dataToDB={ parseDataToDB() }
                />

            : _uiux.mode.isUpdate ?
                <UpdateRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/entry?id=${entry.id}` }
                    body={ body() }
                    dataToDB={ parseDataToDB() }
                    id={ entry.id }
                />

            : _uiux.mode.isDelete ?
                <DeleteRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/entry?id=${entry.id}` }
                    body={ body() }
                    dataToDB={ parseDataToDB() }
                    id={ entry.id }
                />

            : null }

            <RowBox
                key={ inSequence }
                draggable={ draggable }
                onDragStart={ onDragStart }
                onDragOver={ onDragOver }
                onDrop={ onDrop }
            >
                <RowValue
                    draggable={ draggable }
                    title={ `${entry.date}, ${inSequence}, ${entry.inSequence}, ${entry.id}` }
                >
                    <EntryRepr entry={ entry } />
                </RowValue>

                <RowMenu>
                    { 
                    _uiux.process.isValidation || 
                    _uiux.process.isRequestBefore ||
                    _uiux.process.isRequest ||
                    _uiux.process.isResponseWaiting ||
                    _uiux.process.isResponseOk ?
                        <ToolBox><Loader /></ToolBox>
                    : _uiux.process.isResponseError ?
                        <ToolBox><FontAwesomeIcon icon={ faBan } className="icon" /></ToolBox>
                    : 
                        <EntryMenuTool date={date} entry={entry} inSequence={inSequence} />
                    }
                </RowMenu>

                { !_uiux.menu.isOpen ?
                    null
                : !entry.id ? 
                    <BlankEntryMenu 
                        date={ date }
                        entry={ entry }
                        inSequence={ inSequence }
                    />
                : 
                    <ExistsEntryMenu 
                        date={ date }
                        entry={ entry }
                        inSequence={ inSequence }
                    />
                }

                { !_uiux.form.isOpen ?
                    null
                : !_uiux.type.isPayment ?
                    <NoteForm 
                        date={ date }
                        entry={ entry } 
                        inSequence={ inSequence }
                    /> 
                :
                    <PaymentForm 
                        date={ date }
                        entry={ entry } 
                        inSequence={ inSequence } 
                    /> 
                }
            </RowBox> 

        </CRUDContextProvider>
    );
}

const List = styled.ul`
    display: inline-block;
    vertical-align: top;
    width: 100%;
`;

function Entries() {

    const { state } = useContext( DateContext );
    const { entries } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'Entries' ) );

    let inSequence = 0;

    return (
        <List>
            { entries.map( entry =>
                <Entry
                    inSequence={ inSequence++ }
                    key={ inSequence }
                />
            ) }
        </List>
    );
}


export { Entry, Entries };
