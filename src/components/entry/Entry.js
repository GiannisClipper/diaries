import React, { useContext, useEffect } from 'react';
import styled, { css } from 'styled-components';

import StyledRow from '../libs/RowBox';
import { ToolBox } from '../libs/ToolBox';
import { Loader } from '../libs/Loader';
import { SuspendedTool } from '../libs/Tools';

import { CopyPasteContext } from '../core/CopyPaste';
import { CreateRequest, UpdateRequest, DeleteRequest } from '../core/CoreRequests';

import { EntriesContext } from './EntriesContext';
import EntryRepr from './EntryRepr';
import { EntryMenuTool, BlankEntryMenu, ExistsEntryMenu } from './EntryMenu';
import EntryForm from './EntryForm';

import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';

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

const Entry = ( { diary_id, date, entries, index, actions, assets } ) => {

    const entry = entries[ index ];
    const { _uiux } = entry;

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
                        url={ `/.netlify/functions/entry?id=${ entry.id }` }
                    />

                : null }

                <RowValue
                    draggable={ draggable }
                    title={ `${ entry.diary_id }.${ entry.id }.${ entry.date }.${ entry.index }.${ index }.` }
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

                        <SuspendedTool />
                    : 
                        <EntryMenuTool 
                            index={ index } 
                            actions={ actions }
                            assets={ assets }
                        />
                    }
                </RowMenu>

                { ! _uiux.menu.isOpen ?
                    null
                : ! entry.id ? 
                    <BlankEntryMenu 
                        date={ date }
                        entries={ entries }
                        index={ index }
                        actions={ actions }
                        assets={ assets }
                    />
                : 
                    <ExistsEntryMenu 
                        date={ date }
                        entries={ entries }
                        index={ index }
                        actions={ actions }
                        assets={ assets }
                    />
                }

                { _uiux.form.isOpen ?
                    <EntryForm 
                        date={ date }
                        entries={ entries }
                        index={ index }
                        actions={ actions }
                        assets={ assets }
                    /> 
                : null }

            </RowBox> 
        );
    }
}

export default Entry;
export { Entry };
