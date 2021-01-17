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

import { REFContext } from '../REFContext';

function EntryMenuTool( { index, actions, assets } ) {

    const openMenu = prepayAction( actions.openMenu, { assets, index } );

    const REF = useContext( REFContext );

    const menuToolRef = useRef( null );

    return ( 
        <MenuTool
            onClick={event => {
                REF.current.menuTool = menuToolRef.current;
                openMenu();
            }}
            reference={menuToolRef}
        />
    );
}

function EntryMenu( { index, actions, assets, children } ) {

    const closeMenu = prepayAction( actions.closeMenu, { assets, index } );

    const REF = useContext( REFContext );

    let { top, left } = REF.current.menuTool.getBoundingClientRect();
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

function BlankEntryMenu( { date, entries, index, actions, assets } ) {

    const { doPaste, isAbleToPaste } = useContext( CopyPasteContext );

    const entry = entries[ index ];

    const closeMenu = prepayAction( actions.closeMenu, { assets, index } );

    const openForm = prepayAction( actions.openForm, { assets, index } );

    return (
        <EntryMenu
            index={ index }
            actions={ actions }
            assets={ assets }
        >
            <EditTool onClick={ event => {
                openForm( { mode: { isCreate: true } } );
                closeMenu( event, date, index );
            } } />

            <PasteTool onClick={ event => {
                if ( isAbleToPaste() ) {
                    closeMenu();
                    doPaste( { date, entry, index } );
                }
            } } />

            <CloseTool onClick={closeMenu} />
        </EntryMenu>
    );
}

function ExistsEntryMenu( { date, entries, index, actions, assets } ) {

    const { doCut, doCopy, doPaste, isAbleToPaste } = useContext( CopyPasteContext );

    const entry = entries[ index ];

    const closeMenu = prepayAction( actions.closeMenu, { assets, index } );

    const openForm = prepayAction( actions.openForm, { assets, index } );

    return (
        <EntryMenu
            index={ index }
            actions={ actions }
            assets={ assets }
        >
            <EditTool onClick={ event => {
                openForm( { mode: { isUpdate: true } } );
                closeMenu( event, date, index );
            } } />

            <DeleteTool onClick={ event => {
                openForm( { mode: { isDelete: true } } );
                closeMenu();
            } } />

            <CutTool onClick={ event => {
                doCut( { date, entry, index } );
                closeMenu();
            } } />

            <CopyTool onClick={ event => {
                doCopy( { date, entry, index } );
                closeMenu();
            } } />

            <PasteTool onClick={ event => {
                if ( isAbleToPaste() ) {
                    closeMenu();
                    doPaste( { date, entry, index } );
                }
            } } />

            <CloseTool onClick={ closeMenu } />
        </EntryMenu>
    );
}

export { EntryMenuTool, BlankEntryMenu, ExistsEntryMenu };
