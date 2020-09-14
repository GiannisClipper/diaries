import React, { useContext, useRef } from 'react';
import '../styles/EntryMenu.css';
import { REFContext } from './REFContext';
import { Modal } from './libs/Modal';
import { MenuTool, EditTool, AddNoteTool, AddPaymentTool, DeleteTool, CutTool, CopyTool, PasteTool, CloseTool } from './libs/Tools';

function EntryMenuTool( { date, entry, inSequence, openMenu } ) {

    const REF = useContext( REFContext );

    const menuToolRef = useRef( null );

    return ( 
        <MenuTool
            onClick={event => {
                REF.current.menuTool = menuToolRef.current;
                openMenu( event, date, inSequence );
            }}
            reference={menuToolRef}
        />
    );
}

function EntryMenu( { date, entry, inSequence, children } ) {

    const REF = useContext( REFContext );

    let { top, left } = REF.current.menuTool.getBoundingClientRect();
    top = `${top}px`;
    left = `calc( ${left}px - ${children.length * 2}em )`;
    const style = { top, left };

    return (
        <Modal>
            <div className='EntryMenu' style={style}> 
                {children}
            </div>
        </Modal>
    );
}

function BlankEntryMenu( { date, entry, inSequence, openForm, closeMenu, doPaste } ) {

    const REF = useContext( REFContext );

    return (
        <EntryMenu
            date={date}
            entry={entry}
            inSequence={inSequence}
        > 
            <AddNoteTool onClick={event => {
                openForm( event, date, entry, inSequence, { isNote: true }, { isCreate: true } );
                closeMenu( event, date, inSequence );
            }} />

            <AddPaymentTool onClick={event => {
                openForm( event, date, entry, inSequence, { isPayment: true }, { isCreate: true } );
                closeMenu( event, date, inSequence );
            }} />

            <PasteTool onClick={event => {
                if ( REF.current.cut || REF.current.copy ) {
                    closeMenu( event, date, inSequence );
                    doPaste( date, entry, inSequence );
                }
            }} />

            <CloseTool onClick={event => {
                closeMenu( event, date, inSequence )
            }} />
        </EntryMenu>
    );
}

function ExistsEntryMenu( { date, entry, inSequence, openForm, closeMenu, doCut, doCopy, doPaste } ) {

    const REF = useContext( REFContext );

    return (
        <EntryMenu 
            date={date}
            entry={entry}
            inSequence={inSequence}
        >
            <EditTool onClick={event => {
                openForm( event, date, entry, inSequence, { isNote: true }, { isUpdate: true } );
                closeMenu( event, date, inSequence );
            }} />

            <DeleteTool onClick={event => {
                openForm( event, date, entry, inSequence, { isNote: true }, { isDelete: true } );
                closeMenu( event, date, inSequence );
            }} />

            <CutTool onClick={event => {
                doCut( date, entry, inSequence );
                closeMenu( event, date, inSequence );
            }} />

            <CopyTool onClick={event => {
                doCopy( date, entry, inSequence );
                closeMenu( event, date, inSequence );
            }} />

            <PasteTool onClick={event => {
                if ( REF.current.cut || REF.current.copy ) {
                    closeMenu( event, date, inSequence );
                    doPaste( date, entry, inSequence );
                }
            }} />

            <CloseTool onClick={event => {
                closeMenu( event, date, inSequence )
            }} />
        </EntryMenu>
    );
}

export { EntryMenuTool, BlankEntryMenu, ExistsEntryMenu };
