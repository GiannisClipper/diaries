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

function BlankEntryMenu( { index, actions, assets, menuToolCoords, onPaste } ) {

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
                closeMenu();
                onPaste();
            } } />

            <CloseTool onClick={closeMenu} />
        </EntryMenu>
    );
}

function ExistsEntryMenu( { index, actions, assets, menuToolCoords, onCut, onCopy, onPaste } ) {
    
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
                onCut();
                closeMenu();
            } } />

            <CopyTool onClick={ event => {
                onCopy();
                closeMenu();
            } } />

            <PasteTool onClick={ event => {
                closeMenu();
                onPaste();
            } } />

            <CloseTool onClick={ closeMenu } />
        </EntryMenu>
    );
}

export { EntryMenuTool, BlankEntryMenu, ExistsEntryMenu };
