import React, { useContext, useRef } from 'react';
import { DateContext } from '../date/DateContext';
import { REFContext } from '../REFContext';
import { CopyPasteContext } from '../libs/CopyPaste';
import { Modal } from '../libs/Modal';
import { MenuBox } from '../libs/MenuBox';
import { MenuTool, EditTool, AddNoteTool, AddPaymentTool, DeleteTool, CutTool, CopyTool, PasteTool, CloseTool } from '../libs/Tools';

function EntryMenuTool( { index } ) {

    const { actions } = useContext( DateContext );

    const openMenu = payload => actions.openMenu( { index, ...payload } );

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

function EntryMenu( { index, children } ) {

    const { actions } = useContext( DateContext );

    const closeMenu = payload => actions.closeMenu( { index, ...payload } );

    const REF = useContext( REFContext );

    let { top, left } = REF.current.menuTool.getBoundingClientRect();
    top = `${top}px`;
    left = `calc( ${left}px - ${children.length * 2}em )`;
    const style = { top, left };

    return (
        <Modal onClick={ closeMenu }>
            <MenuBox style={ style }> 
                { children }
            </MenuBox>
        </Modal>
    );
}

function BlankEntryMenu( { date, entry, index } ) {

    const { doPaste, isAbleToPaste } = useContext( CopyPasteContext );

    const { actions } = useContext( DateContext );

    const closeMenu = payload => actions.closeMenu( { index, ...payload } );

    const openForm = payload => actions.openForm( { index, ...payload } );

    return (
        <EntryMenu>
            <AddNoteTool onClick={ event => {
                openForm( { type: { isNote: true }, mode: { isCreate: true } } );
                closeMenu();
            } } />

            <AddPaymentTool onClick={ event => {
                openForm( { type: { isPayment: true }, mode: { isCreate: true } } );
                closeMenu();
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

function ExistsEntryMenu( { date, entry, index } ) {

    const { doCut, doCopy, doPaste, isAbleToPaste } = useContext( CopyPasteContext );

    const { actions } = useContext( DateContext );

    const closeMenu = payload => actions.closeMenu( { index, ...payload } );

    const openForm = payload => actions.openForm( { index, ...payload } );

    const type = entry.type === 'payment'
        ? { isPayment: true }
        : { isNote: true };

    return (
        <EntryMenu>
            <EditTool onClick={ event => {
                openForm( { type, mode: { isUpdate: true } } );
                closeMenu( event, date, index );
            } } />

            <DeleteTool onClick={ event => {
                openForm( { type, mode: { isDelete: true } } );
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
