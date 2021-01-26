import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';

import StyledRow from '../libs/RowBox';
import { ToolBox } from '../libs/ToolBox';
import { Loader } from '../libs/Loader';
import { SuspendedTool } from '../libs/Tools';

import { CutCopyPasteContext } from '../core/CutCopyPasteContext';
import { CreateRequest, UpdateRequest, DeleteRequest } from '../core/CoreRequests';
import { dragFeature, dropFeature } from '../core/features/dragNDrop';

import { EntriesContext } from './EntriesContext';
import EntryRepr from './EntryRepr';
import { EntryMenuTool, BlankEntryMenu, ExistsEntryMenu } from './EntryMenu';
import EntryForm from './EntryForm';
import { presetCutCopyPasteFeature, cutCopyPasteFeature } from './features/cutCopyPaste';

const RowBox = StyledRow.RowBox;

const RowValue = styled( StyledRow.RowValue )`
    width: calc( 100% - 2em );
`;

const RowMenu = styled( StyledRow.RowMenu )`
    width: 2em;
`;

const Entry = ( { diary_id, date, entries, index, actions, assets } ) => {

    const entry = entries[ index ];
    const { _uiux } = entry;

    // cut-copy-paste feature...

    const cutCopyPasteContext = useContext( CutCopyPasteContext )

    const { onCut, onCopy, onPaste } = presetCutCopyPasteFeature( 
        { cutCopyPasteContext, date, entries, index, actions, assets } 
    );

    useEffect( () => {
        cutCopyPasteFeature( 
            { cutCopyPasteContext, entries, index, actions, assets } 
        );
    } );

    // ...cut-copy-paste feature

    // drag-n-drop feature...

    const elemRef = useRef();

    useEffect( () => {
        if ( ! _uiux.form.isOpen &&  ! _uiux.status.isResponseError ) {

            if ( entry.id ) dragFeature( { elemRef, onDrag: onCut } );

            dropFeature( { elemRef, onDrop: onPaste } );
        }
    } );

    // ...drag-n-drop feature

    if ( ! diary_id ) {
        return null;

    } else {
        return (
            <RowBox
                key={ index }
                ref={ elemRef }
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
                        index={ index }
                        actions={ actions }
                        assets={ assets }
                        menuToolCoords={ _uiux.menuToolCoords }
                        onPaste={ onPaste }
                    />
                : 
                    <ExistsEntryMenu 
                        index={ index }
                        actions={ actions }
                        assets={ assets }
                        menuToolCoords={ _uiux.menuToolCoords }
                        onCut={ onCut }
                        onCopy={ onCopy }
                        onPaste={ onPaste }
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
