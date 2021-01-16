import React, { useContext, useRef, useEffect } from 'react';

import { BenchContext } from '../bench/BenchContext';
import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';
import { EntriesContext } from '../entry/EntriesContext';

import assets from './assets/assets'; 
import { CreateRequest, UpdateRequest, DeleteRequest } from '../core/CoreRequests';
import { dateToYYYYMMDD } from '../core/helpers/dates';

import { ToolBox } from '../libs/ToolBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

import { Loader } from '../libs/Loader';
import { EntryMenuTool, BlankEntryMenu, ExistsEntryMenu } from './EntryMenu';
import EntryRepr from './EntryRepr';
import EntryForm from './EntryForm';

import styled, { css } from 'styled-components';
import StyledRow from '../libs/RowBox';
import { CopyPasteContext } from '../libs/CopyPaste';

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

const Entry = ( { index } ) => {

    const { diary_id } = useContext( BenchContext ).state;

    const { state } = useContext( EntriesContext );
    const { date, entries } = state;
    const entry = entries[ index ];
    const { _uiux } = entry;

    // if ( ! entry.id ) {
    //     entry.diary_id = diary_id;
    //     entry.date = dateToYYYYMMDD( date );
    // }
    assets.schema = () => ( { 
        ...assets.schema(), 
        diary_id, 
        date: dateToYYYYMMDD( date ) 
    } );

    entry.index = index;
    entry.genres = useContext( GenresContext ).state.genres;
    entry.funds = useContext( FundsContext ).state.funds;

    const { doCut, doPaste } = useContext( CopyPasteContext );

    let draggable, onDragStart, onDragOver, onDrop;

    if ( ! _uiux.form.isOpen && ! _uiux.status.isResponseError ) {

        if ( entry.id ) {  // no drag empty rows

            draggable = 'true';

            onDragStart = event => {
                event.dataTransfer.effectAllowed = 'move';
                doCut( { date, entry, index } );
            }
        }

        onDragOver = event => {  // allowDrop
            event.preventDefault();
        }

        onDrop = event => {
            event.preventDefault();
            doPaste( { date, entry, index } );
        }
    }

    // const _saved = useRef( { date, index } );

    // const addDiaryId = () => _uiux.mode.isCreate ? { diary_id } : undefined;

    // const parseDataToDB = _uiux.type.isPayment 
    //     ? 
    //     () => parsePaymentToDB(
    //             { ...entry, date: dateToYYYYMMDD( date ), index, ...addDiaryId() },
    //             genres, 
    //             funds 
    //     )
    //     : 
    //     () => parseNoteToDB( 
    //             { ...entry, date: dateToYYYYMMDD( date ), index, ...addDiaryId() },
    //     );

    // const body = () => JSON.stringify( {
    //     old: { date: dateToYYYYMMDD( _saved.current.date ), index: _saved.current.index },
    //     new: { date: dateToYYYYMMDD( date ), index },
    //     data: parseDataToDB(),
    // } );

    // useEffect( () =>  console.log( 'Has rendered. ', 'Entry' ) );

    if ( ! diary_id ) {
        return null;

    } else {
        return (
            <RowBox
                key={ index }
                draggable={ draggable }
                onDragStart={ onDragStart }
                onDragOver={ onDragOver }
                onDrop={ onDrop }
            >

                { _uiux.mode.isCreate ?
                    <CreateRequest
                        Context={ EntriesContext }
                        assets={ assets }
                        index={ index }
                        url={ `/.netlify/functions/entry` }
                    />

                : _uiux.mode.isUpdate ?
                    <UpdateRequest 
                        Context={ EntriesContext }
                        assets={ assets }
                        index={ index }
                        url={ `/.netlify/functions/entry?id=${entry.id}` }
                    />

                : _uiux.mode.isDelete ?
                    <DeleteRequest
                        Context={ EntriesContext }
                        assets={ assets }
                        index={ index }
                        url={ `/.netlify/functions/entry?id=${entry.id}` }
                    />

                : null }

                <RowValue
                    draggable={ draggable }
                    title={ `${entry.diary_id}.${entry.id}.${entry.date}.${entry.index}.${index}.` }
                >
                    <EntryRepr entry={ entry } />
                </RowValue>

                <RowMenu>
                    { 
                    _uiux.status.isValidation || 
                    _uiux.status.isRequestBefore ||
                    _uiux.status.isRequest ||
                    _uiux.status.isResponseWaiting ||
                    _uiux.status.isResponseOk ?
                        <ToolBox><Loader /></ToolBox>
                    : _uiux.status.isResponseError ||
                      _uiux.status.isResponseErrorAfter ?
          
                        <ToolBox><FontAwesomeIcon icon={ faBan } className="icon" /></ToolBox>
                    : 
                        <EntryMenuTool index={ index } />
                    }
                </RowMenu>

                { ! _uiux.menu.isOpen ?
                    null
                : ! entry.id ? 
                    <BlankEntryMenu 
                        date={ date }
                        entry={ entry }
                        index={ index }
                    />
                : 
                    <ExistsEntryMenu 
                        date={ date }
                        entry={ entry }
                        index={ index }
                    />
                }

                { ! _uiux.form.isOpen ?
                    null
                : ! _uiux.type.isPayment ?
                    <EntryForm 
                        date={ date }
                        entry={ entry } 
                        index={ index }
                    /> 
                :
                    <EntryForm 
                        date={ date }
                        entry={ entry } 
                        index={ index } 
                    /> 
                }

            </RowBox> 
        );
    }
}

export default Entry;
export { Entry };
