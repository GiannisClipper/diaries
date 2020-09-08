import React, { useContext, useRef } from 'react';
import '../styles/EntryMenu.css';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';
import { Modal } from './libs/Modal';
import { MenuTool, EditTool, DeleteTool, CutTool, CopyTool, PasteTool, CloseTool } from './libs/Tools';

function EntryMenuTool( { date, entry, inSequence } ) {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    REF.current.openMenu = ( event, date, inSequence ) => {
        STATE.dispatch( { 
            type: 'OPEN_ENTRY_MENU',
            payload: { date, inSequence },
        } );
    }

    REF.current.closeMenu = ( event, date, inSequence ) => {
        STATE.dispatch( { 
            type: 'CLOSE_ENTRY_MENU',
            payload: { date, inSequence },
        } );
    }

    const menuToolRef = useRef( null );

    return ( 
        <MenuTool
            onClick={event => {
                REF.current.menuTool = menuToolRef.current;
                REF.current.openMenu( event, date, inSequence );
            }}
            refference={menuToolRef}
        />
    );
}

function BlankEntryMenu( { date, entry, inSequence } ) {

    const REF = useContext( REFContext );

    let { top, left } = REF.current.menuTool.getBoundingClientRect();
    top = `${top}px`;
    left = `calc( ${left}px - 6em )`;
    const style = { top, left };

    return (
        <Modal>
            <div className='EntryMenu' style={style}>
 
                <EditTool onClick={event => {
                    REF.current.openCreateEntryForm( event, date, entry, inSequence );
                    REF.current.closeMenu( event, date, inSequence );
                }} />

                <PasteTool onClick={event => {
                    if ( REF.current.cut || REF.current.copy ) {
                        REF.current.closeMenu( event, date, inSequence );
                        REF.current.pasteEntry( date, entry, inSequence );
                    }
                }} />

                <CloseTool onClick={event => {
                    REF.current.closeMenu( event, date, inSequence )
                }} />

            </div>
        </Modal>
    );
}

function EntryMenu( { date, entry, inSequence } ) {

    const REF = useContext( REFContext );

    let { top, left } = REF.current.menuTool.getBoundingClientRect();
    top = `${top}px`;
    left = `calc( ${left}px - 12em )`;
    const style = { top, left };

    return (
        <Modal>
            <div className='EntryMenu' style={style}>
 
                <EditTool onClick={event => {
                    REF.current.openUpdateEntryForm( event, date, entry, inSequence );
                    REF.current.closeMenu( event, date, inSequence );
                }} />

                <DeleteTool onClick={event => {
                    REF.current.openDeleteEntryForm( event, date, entry, inSequence );
                    REF.current.closeMenu( event, date, inSequence );
                }} />

                <CutTool onClick={event => {
                    REF.current.cutEntry( date, entry, inSequence );
                    REF.current.closeMenu( event, date, inSequence );
                }} />

                <CopyTool onClick={event => {
                    REF.current.copyEntry( date, entry, inSequence );
                    REF.current.closeMenu( event, date, inSequence );
                }} />

                <PasteTool onClick={event => {
                    if ( REF.current.cut || REF.current.copy ) {
                        REF.current.closeMenu( event, date, inSequence );
                        REF.current.pasteEntry( date, entry, inSequence );
                    }
                }} />

                <CloseTool onClick={event => {
                    REF.current.closeMenu( event, date, inSequence )
                }} />

            </div>
        </Modal>
    );
}

export { EntryMenuTool, BlankEntryMenu, EntryMenu };
