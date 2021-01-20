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

import { CopyPasteContext } from '../core/CopyPaste';
import prepayAction from '../core/helpers/prepayAction';

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

    const { doPaste, isPasteEnabled } = useContext( CopyPasteContext );

    const entry = entries[ index ];

    const pasteProcess = prepayAction( actions.pasteProcess, { assets, index } );

    const createRequest = prepayAction( actions.createRequest, { assets, index } );

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
                closeMenu( event, date, index );
            } } />

            <PasteTool onClick={ event => {
                if ( isPasteEnabled() ) {
                    closeMenu();
                    doPaste( { date, index, entry, pasteProcess } );
                }
            } } />

            <CloseTool onClick={closeMenu} />
        </EntryMenu>
    );
}

function ExistsEntryMenu( { date, entries, index, actions, assets, menuToolCoords } ) {

    const { doCut, doCopy, doPaste, isPasteEnabled } = useContext( CopyPasteContext );

    const entry = entries[ index ];

    const cutProcess = prepayAction( actions.cutProcess, { assets, index } );
    const pasteProcess = prepayAction( actions.pasteProcess, { assets, index } );

    const createRequest = prepayAction( actions.createRequest, { assets, index } );

    const updateRequest = prepayAction( actions.updateRequest, { assets, index } );

    const deleteResponseOkAfter = prepayAction( actions.deleteResponseOkAfter, { assets, index } );

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
                closeMenu( event, date, index );
            } } />

            <DeleteTool onClick={ event => {
                deleteMode();
                openForm();
                closeMenu();
            } } />

            <CutTool onClick={ event => {
                doCut( { date, index, entry, cutProcess } );
//                doCut( { date, index, entry, updateRequest, deleteResponseOkAfter } );
                closeMenu();
            } } />

            <CopyTool onClick={ event => {
                doCopy( { date, index, entry } );
                closeMenu();
            } } />

            <PasteTool onClick={ event => {
                if ( isPasteEnabled() ) {
                    closeMenu();
                    doPaste( { date, index, entry, pasteProcess } );
//                    doPaste( { date, index, entry, createRequest } );
                }
            } } />

            <CloseTool onClick={ closeMenu } />
        </EntryMenu>
    );
}

export { EntryMenuTool, BlankEntryMenu, ExistsEntryMenu };
