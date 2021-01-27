import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';

import StyledRow from '../libs/RowBox';
import { ToolBox } from '../libs/ToolBox';
import { Loader } from '../libs/Loader';
import { SuspendedTool } from '../libs/Tools';

import { CutCopyPasteContext } from '../core/CutCopyPasteContext';
import { createRequestFeature, updateRequestFeature, deleteRequestFeature } from '../core/features/requests';
import { dragFeature, dropFeature } from '../core/features/dragNDrop';

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

    // request features...

    useEffect( () => {

        if ( _uiux.mode.isCreate ) {
            createRequestFeature( { 
                _item: entry,
                actions,
                assets,
                index,
                url: `/.netlify/functions/entry`
            } );

        } else if ( _uiux.mode.isUpdate ) {
            updateRequestFeature( { 
                _item: entry,
                actions,
                assets,
                index,
                url: `/.netlify/functions/entry?id=${ entry.id }`
            } );

        } else if ( _uiux.mode.isDelete ) {
            deleteRequestFeature( { 
                _item: entry,
                actions,
                assets,
                index,
                url: `/.netlify/functions/entry?id=${ entry.id }`
            } );
        }
    }, [ entry, _uiux, actions, assets, index ] );

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
    
    // drag-n-drop feature...

    const elemRef = useRef();

    useEffect( () => {
        if ( ! _uiux.form.isOpen &&  ! _uiux.status.isResponseError ) {

            if ( entry.id ) dragFeature( { elemRef, onDrag: onCut } );

            dropFeature( { elemRef, onDrop: onPaste } );
        }
    } );

    if ( ! diary_id ) {
        return null;

    } else {
        return (
            <RowBox
                key={ index }
                ref={ elemRef }
            >
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
