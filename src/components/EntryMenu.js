import React, { useContext, useRef } from 'react';
import { REFContext } from './REFContext';
import { CRUDContext } from "./libs/CRUD";
import { Modal } from './libs/Modal';
import { MenuBox } from './libs/MenuBox';
import { MenuTool, EditTool, AddNoteTool, AddPaymentTool, DeleteTool, CutTool, CopyTool, PasteTool, CloseTool } from './libs/Tools';

function EntryMenuTool() {

    const { openMenu } = useContext( CRUDContext );

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

function EntryMenu( { children } ) {

    const { closeMenu } = useContext( CRUDContext );

    const REF = useContext( REFContext );

    let { top, left } = REF.current.menuTool.getBoundingClientRect();
    top = `${top}px`;
    left = `calc( ${left}px - ${children.length * 2}em )`;
    const style = { top, left };

    return (
        <Modal onClick={closeMenu}>
            <MenuBox style={style}> 
                {children}
            </MenuBox>
        </Modal>
    );
}

function BlankEntryMenu( { date, entry, inSequence, doPaste } ) {

    const { closeMenu, openForm } = useContext( CRUDContext );

    const REF = useContext( REFContext );

    return (
        <EntryMenu>
            <AddNoteTool onClick={event => {
                openForm( { type: { isNote: true }, mode: { isCreate: true } } );
                closeMenu();
            }} />

            <AddPaymentTool onClick={event => {
                openForm( { type: { isPayment: true }, mode: { isCreate: true } } );
                closeMenu();
            }} />

            <PasteTool onClick={event => {
                if ( REF.current.cut || REF.current.copy ) {
                    closeMenu();
                    doPaste( date, entry, inSequence );
                }
            }} />

            <CloseTool onClick={closeMenu} />
        </EntryMenu>
    );
}

function ExistsEntryMenu( { date, entry, inSequence, doCut, doCopy, doPaste } ) {

    const { closeMenu, openForm } = useContext( CRUDContext );

    const REF = useContext( REFContext );

    const type = entry.data.type === 'payment'
        ? { isPayment: true }
        : { isNote: true };

    return (
        <EntryMenu>
            <EditTool onClick={event => {
                openForm( { type, mode: { isUpdate: true } } );
                closeMenu( event, date, inSequence );
            }} />

            <DeleteTool onClick={event => {
                openForm( { type, mode: { isDelete: true } } );
                closeMenu();
            }} />

            <CutTool onClick={event => {
                doCut( date, entry, inSequence );
                closeMenu();
            }} />

            <CopyTool onClick={event => {
                doCopy( date, entry, inSequence );
                closeMenu();
            }} />

            <PasteTool onClick={event => {
                if ( REF.current.cut || REF.current.copy ) {
                    closeMenu();
                    doPaste( date, entry, inSequence );
                }
            }} />

            <CloseTool onClick={closeMenu} />
        </EntryMenu>
    );
}

export { EntryMenuTool, BlankEntryMenu, ExistsEntryMenu };
