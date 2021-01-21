import React, { useContext, useEffect } from 'react';
import styled, { css } from 'styled-components';

import StyledRow from '../libs/RowBox';
import { ToolBox } from '../libs/ToolBox';
import { Loader } from '../libs/Loader';
import { SuspendedTool } from '../libs/Tools';

import { CopyPasteContext } from '../core/CopyPaste';
import { CreateRequest, UpdateRequest, DeleteRequest } from '../core/CoreRequests';
import prepayAction from '../core/helpers/prepayAction';
import { dateToYYYYMMDD } from '../core/helpers/dates';

import { EntriesContext } from './EntriesContext';
import EntryRepr from './EntryRepr';
import { EntryMenuTool, BlankEntryMenu, ExistsEntryMenu } from './EntryMenu';
import EntryForm from './EntryForm';

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

    const { doCut, isCut, isCopy, doPaste, doPasteOk, doPasteError } = useContext( CopyPasteContext );

    const cutOk = prepayAction( actions.cutOk, { assets, index } );
    const paste = prepayAction( actions.paste, { assets, index } );
    const pasteOk = prepayAction( actions.pasteOk, { assets, index } );
    const pasteError = prepayAction( actions.pasteError, { assets, index } );    
    const createMode = prepayAction( actions.createMode, { assets, index } );
    const createRequest = prepayAction( actions.createRequest, { assets, index } );
    const updateMode = prepayAction( actions.updateMode, { assets, index } );
    const updateRequest = prepayAction( actions.updateRequest, { assets, index } );

    let draggable, onDragStart, onDragOver, onDrop;

    if ( ! _uiux.form.isOpen && ! _uiux.status.isResponseError ) {

        if ( entry.id ) {  // no drag empty rows

            draggable = 'true';

            onDragStart = event => {
                event.dataTransfer.effectAllowed = 'move';                
                const data = { ...entry };
                doCut( { data, cutOk } );
            }
        }

        onDragOver = event => {  // allowDrop
            event.preventDefault();
        }

        onDrop = event => {
            event.preventDefault();
            if ( isCut() ) {
                const data = { date: dateToYYYYMMDD( date ), index };
                doPaste( { data, paste, pasteOk, pasteError } );
            } else if ( isCopy() ) {
                const data = { date: dateToYYYYMMDD( date ), index, id: null };
                doPaste( { data, paste, pasteOk, pasteError } );
            }
        }
    }

    if ( _uiux.mode.isPaste ) {
        if ( Object.keys( _uiux.status ).length === 0 ) {
            if ( isCut() ) {
                updateMode();
                updateRequest();
            } else if ( isCopy() ) {
                createMode();        
                createRequest();
            }
        } else if ( _uiux.status.isResponseOk ) {
            doPasteOk();
        } else if ( _uiux.status.isResponseError ) {
            doPasteError();
        }
    }

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
                        url={ `/.netlify/functions/entry?id=${ entry.id }` }
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
                        menuToolCoords={ _uiux.menuToolCoords }
                    />
                : 
                    <ExistsEntryMenu 
                        date={ date }
                        entries={ entries }
                        index={ index }
                        actions={ actions }
                        assets={ assets }
                        menuToolCoords={ _uiux.menuToolCoords }
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
