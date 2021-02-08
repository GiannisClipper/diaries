import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';

import StyledRow from '../libs/RowBox';
import { LoadingIcon, SuspendedIcon } from '../libs/Icons';

import { CutCopyPasteContext } from '../core/CutCopyPasteContext';
import { createRequestFeature, updateRequestFeature, deleteRequestFeature } from '../core/features/requests';
import { dragFeature, dropFeature } from '../core/features/dragNDrop';

import EntryRepr from './EntryRepr';
import { EntryMenuOption, BlankEntryMenu, ExistsEntryMenu } from './EntryMenu';
import EntryForm from './EntryForm';
import { presetCutCopyPasteFeature, cutCopyPasteFeature } from './features/cutCopyPaste';

const RowBox = StyledRow.RowBox;

const RowValue = styled( StyledRow.RowValue )`
    width: calc( 100% - 2em );
`;

const RowMenu = styled( StyledRow.RowMenu )`
    width: 2em;
`;

const Entry = ( { diary_id, date, entries, index, actions, assets, lexicon } ) => {

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

                    <LoadingIcon />

                : _uiux.status.isResponseError ||
                _uiux.status.isResponseErrorAfter ?

                    <SuspendedIcon />
                : 
                    <EntryMenuOption 
                        index={ index } 
                        actions={ actions }
                        assets={ assets }
                        lexicon={ lexicon }
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
                    lexicon={ lexicon }
                    menuOptionCoords={ _uiux.menuOptionCoords }
                    onPaste={ onPaste }
                />
            : 
                <ExistsEntryMenu 
                    index={ index }
                    actions={ actions }
                    assets={ assets }
                    lexicon={ lexicon }
                    menuOptionCoords={ _uiux.menuOptionCoords }
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
                    lexicon={ lexicon }
                /> 
            : null }

        </RowBox> 
    );
}

export default Entry;
export { Entry };
