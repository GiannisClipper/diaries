import React, { useContext } from 'react';
import '../styles/EntryMenu.css';
import { REFContext } from './REFContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCut, faCamera, faClone, faTimes } from '@fortawesome/free-solid-svg-icons';

function EntryMenu( { date, entry, inSequence } ) {

    const REF = useContext( REFContext );

    let { top, left } = REF.current.menuTool.getBoundingClientRect();
    top = `${top}px`;
    left = entry.data.id ? `calc( ${left}px - 12em )` : `calc( ${left}px - 6em )`;
    const style = { top, left };

    if ( entry.data.id ) {
        return (
            <div className='modal'>
                <div className='EntryMenu' style={style}>

                    <button className='edit' onClick={event => {
                        REF.current.openUpdateEntryForm( event, date, entry, inSequence );
                        REF.current.closeMenu( event, date, inSequence );
                    }}>
                        <FontAwesomeIcon icon={ faEdit } className="icon" title="Επεξεργασία" />
                    </button>

                    <button className='delete' onClick={event => {
                        REF.current.openDeleteEntryForm( event, date, entry, inSequence );
                        REF.current.closeMenu( event, date, inSequence );
                    }}>
                        <FontAwesomeIcon icon={ faTrashAlt } className="icon" title="Διαγραφή" />
                    </button>

                    <button className='cut' onClick={event => {
                        REF.current.cutEntry( date, entry, inSequence );
                        REF.current.closeMenu( event, date, inSequence );
                    }}>
                        <FontAwesomeIcon icon={ faCut } className="icon" title="Αποκοπή" />
                    </button>

                    <button className='copy' onClick={event => {
                        REF.current.copyEntry( date, entry, inSequence );
                        REF.current.closeMenu( event, date, inSequence );
                    }}>
                        <FontAwesomeIcon icon={ faCamera } className="icon" title="Αντιγραφή" />
                    </button>

                    <button className='paste' onClick={event => {
                        if ( REF.current.cut || REF.current.copy ) {
                            REF.current.closeMenu( event, date, inSequence );
                            REF.current.pasteEntry( date, entry, inSequence );
                        }
                    }}>
                        <FontAwesomeIcon icon={ faClone } className="icon" title="Επικόλληση" />
                    </button>

                    <button className='close' onClick={event => {
                        REF.current.closeMenu( event, date, inSequence )
                    }}>
                        <FontAwesomeIcon icon={ faTimes } className="icon" title="Κλείσιμο" />
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className='modal'>
                <div className='EntryMenu' style={style}>

                    <button className='edit' onClick={event => {
                        REF.current.openCreateEntryForm( event, date, entry, inSequence );
                        REF.current.closeMenu( event, date, inSequence );
                    }}>
                        <FontAwesomeIcon icon={ faEdit } className="icon" title="Επεξεργασία" />
                    </button>

                    <button className='paste' onClick={event => {
                        if ( REF.current.cut || REF.current.copy ) {
                            REF.current.closeMenu( event, date, inSequence );
                            REF.current.pasteEntry( date, entry, inSequence );
                        }
                    }}>
                        <FontAwesomeIcon icon={ faClone } className="icon" title="Επικόλληση" />
                    </button>

                    <button className='close' onClick={event => {
                        REF.current.closeMenu( event, date, inSequence )
                    }}>
                        <FontAwesomeIcon icon={ faTimes } className="icon" title="Κλείσιμο" />
                    </button>
                </div>
            </div>
        );
    }
}

export default EntryMenu;
