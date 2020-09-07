import React, { useContext } from 'react';
import '../styles/EntryMenu.css';
import { REFContext } from './REFContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCut, faCamera, faClone, faTimes } from '@fortawesome/free-solid-svg-icons';

function EntryMenu( { date, entry, inSequence } ) {

    const REF = useContext( REFContext );

    let { top, left } = REF.current.menuTool.getBoundingClientRect();
    top = `${top}px`;
    left = entry.data.id ? `calc( ${left}px - 10em )` : `calc( ${left}px - 6em )`;
    const style = { top, left };

    if ( entry.data.id ) {
        return (
            <div className='modal' onClick={event => REF.current.closeMenu( event, date, inSequence )}>
                <div className='EntryMenu' style={style}>
                    <div className='edit' onClick={event => {
                        event.stopPropagation();
                        REF.current.openForm( event, { isUpdating: true }, date, entry, inSequence );
                        REF.current.closeMenu( event, date, inSequence );
                    }}>
                        <FontAwesomeIcon icon={ faEdit } className="icon" title="Επεξεργασία" />
                    </div>
                    <div className='delete' onClick={event => {
                        event.stopPropagation();
                        REF.current.openForm( event, { isDeleting: true }, date, entry, inSequence );
                        REF.current.closeMenu( event, date, inSequence );
                    }}>
                        <FontAwesomeIcon icon={ faTrashAlt } className="icon" title="Διαγραφή" />
                    </div>
                    <div className='cut' onClick={event => {
                        event.stopPropagation();
                        REF.current.cutEntry( date, entry, inSequence );
                        REF.current.closeMenu( event, date, inSequence );
                    }}>
                        <FontAwesomeIcon icon={ faCut } className="icon" title="Αποκοπή" />
                    </div>
                    <div className='copy' onClick={event => {
                        event.stopPropagation();
                        REF.current.copyEntry( date, entry, inSequence );
                        REF.current.closeMenu( event, date, inSequence );
                    }}>
                        <FontAwesomeIcon icon={ faCamera } className="icon" title="Αντιγραφή" />
                    </div>
                    <div className='paste' onClick={event => {
                        event.stopPropagation();
                        if ( REF.current.cut || REF.current.copy ) {
                            REF.current.closeMenu( event, date, inSequence );
                            REF.current.pasteEntry( date, entry, inSequence );
                        }
                    }}>
                        <FontAwesomeIcon icon={ faClone } className="icon" title="Επικόλληση" />
                    </div>
                    <div className='close' onClick={event => {
                        event.stopPropagation();
                        REF.current.closeMenu( event, date, inSequence )
                    }}>
                        <FontAwesomeIcon icon={ faTimes } className="icon" title="Κλείσιμο" />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className='modal' onClick={event => REF.current.closeMenu( event, date, inSequence )}>
                <div className='EntryMenu' style={style}>
                    <div className='edit' onClick={event => {
                        event.stopPropagation();
                        REF.current.openForm( event, { isCreating: true }, date, entry, inSequence );
                        REF.current.closeMenu( event, date, inSequence );
                    }}>
                        <FontAwesomeIcon icon={ faEdit } className="icon" title="Επεξεργασία" />
                    </div>
                    <div className='paste' onClick={event => {
                        event.stopPropagation();
                        if ( REF.current.cut || REF.current.copy ) {
                            REF.current.closeMenu( event, date, inSequence );
                            REF.current.pasteEntry( date, entry, inSequence );
                        }
                    }}>
                        <FontAwesomeIcon icon={ faClone } className="icon" title="Επικόλληση" />
                    </div>
                    <div className='close' onClick={event => {
                        event.stopPropagation();
                        REF.current.closeMenu( event, date, inSequence )
                    }}>
                        <FontAwesomeIcon icon={ faTimes } className="icon" title="Κλείσιμο" />
                    </div>
                </div>
            </div>
        );
    }
}

export default EntryMenu;
