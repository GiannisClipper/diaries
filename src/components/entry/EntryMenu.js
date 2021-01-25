import React, { useContext, useRef } from 'react';

import { Modal } from '../libs/Modal';
import { MenuBox } from '../libs/MenuBox';
import { 
    MenuTool, 
    EditTool, 
    DeleteTool, 
    CutTool, 
    CopyTool, 
    PasteTool, 
    CloseTool
} from '../libs/Tools';

import { CorePasteContext } from '../core/CorePaste';
import prepayAction from '../core/helpers/prepayAction';
import { dateToYYYYMMDD } from '../core/helpers/dates';

function EntryMenuTool( { index, actions, assets } ) {

    const openMenu = prepayAction( actions.openMenu, { assets, index } );

    const menuToolRef = useRef( null );

    return ( 
        <MenuTool
            reference={ menuToolRef }
            onClick={ event => {
                const { top, left } = menuToolRef.current.getBoundingClientRect();
                const menuToolCoords = { top, left };
                openMenu( { menuToolCoords } );
            }}
        />
    );
}

function EntryMenu( { index, actions, assets, children, menuToolCoords } ) {

    const closeMenu = prepayAction( actions.closeMenu, { assets, index } );

    let { top, left } = menuToolCoords;
    top = `${ top }px`;
    left = `calc( ${ left }px - ${ children.length * 2 }em )`;
    const style = { top, left };

    return (
        <Modal onClick={ closeMenu }>
            <MenuBox style={ style }> 
                { children }
            </MenuBox>
        </Modal>
    );
}

function BlankEntryMenu( { date, entries, index, actions, assets, menuToolCoords } ) {

    const { isCut, isCopy, doPaste } = useContext( CorePasteContext );

    const paste = prepayAction( actions.paste, { assets, index } );
    const pasteOk = prepayAction( actions.pasteOk, { assets, index } );
    const pasteError = prepayAction( actions.pasteError, { assets, index } );    

    const createMode = prepayAction( actions.createMode, { assets, index } );
    const openForm = prepayAction( actions.openForm, { assets, index } );
    const closeMenu = prepayAction( actions.closeMenu, { assets, index } );

    return (
        <EntryMenu
            index={ index }
            actions={ actions }
            assets={ assets }
            menuToolCoords={ menuToolCoords }
        >
            <EditTool onClick={ event => {
                createMode();
                openForm();
                closeMenu();
            } } />

            <PasteTool onClick={ event => {
                if ( isCut() ) {
                    closeMenu();
                    const data = { date: dateToYYYYMMDD( date ), index };
                    doPaste( { data, paste, pasteOk, pasteError } );
                } else if ( isCopy() ) {
                    closeMenu();
                    const data = { date: dateToYYYYMMDD( date ), index, id: null };
                    doPaste( { data, paste, pasteOk, pasteError } );
                }

            } } />

            <CloseTool onClick={closeMenu} />
        </EntryMenu>
    );
}

function ExistsEntryMenu( { date, entries, index, actions, assets, menuToolCoords } ) {

    const entry = entries[ index ];

    const { doCut, doCopy, isCut, isCopy, doPaste } = useContext( CorePasteContext );

    const cutOk = prepayAction( actions.cutOk, { assets, index } );
    const cutError = prepayAction( actions.cutError, { assets, index } );
    const paste = prepayAction( actions.paste, { assets, index } );
    const pasteOk = prepayAction( actions.pasteOk, { assets, index } );
    const pasteError = prepayAction( actions.pasteError, { assets, index } );    
    
    const updateMode = prepayAction( actions.updateMode, { assets, index } );
    const deleteMode = prepayAction( actions.deleteMode, { assets, index } );
    const openForm = prepayAction( actions.openForm, { assets, index } );
    const closeMenu = prepayAction( actions.closeMenu, { assets, index } );

    return (
        <EntryMenu
            index={ index }
            actions={ actions }
            assets={ assets }
            menuToolCoords={ menuToolCoords }
        >
            <EditTool onClick={ event => {
                updateMode();
                openForm();
                closeMenu();
            } } />

            <DeleteTool onClick={ event => {
                deleteMode();
                openForm();
                closeMenu();
            } } />

            <CutTool onClick={ event => {
                const data = { ...entry };
                doCut( { data, cutOk, cutError } );
                closeMenu();
            } } />

            <CopyTool onClick={ event => {
                const data = { ...entry };
                doCopy( { data } );
                closeMenu();
            } } />

            <PasteTool onClick={ event => {
                if ( isCut() ) {
                    closeMenu();
                    const data = { date: dateToYYYYMMDD( date ), index };
                    doPaste( { data, paste, pasteOk, pasteError } );
                } else if ( isCopy() ) {
                    closeMenu();
                    const data = { date: dateToYYYYMMDD( date ), index, id: null };
                    doPaste( { data, paste, pasteOk, pasteError } );
                }

            } } />

            <CloseTool onClick={ closeMenu } />
        </EntryMenu>
    );
}

export { EntryMenuTool, BlankEntryMenu, ExistsEntryMenu };
