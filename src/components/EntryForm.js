import React, { useState, useContext } from 'react';
import '../styles/EntryForm.css';
import { REFContext } from './REFContext';
import { dayNames } from '../helpers/dates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Loader } from './libs/Loader';
import { Modal } from './libs/Modal';

function EntryForm( { date, entry, inSequence } ) {

    const REF = useContext( REFContext );

    const dateInfo = (
        dayNames[ date.getDay() ] + ' ' +
        date.getDate().toString().padStart( 2, '0' ) + '-' +
        ( date.getMonth() + 1 ).toString().padStart( 2, '0' ) + '-' +
        date.getFullYear()
    );

    const formArgs = {};

    if ( entry.uiux.mode.isCreate ) {
        formArgs.className = 'create';
        formArgs.confirmButtonLabel = ' νέας εγγραφής';

    } else if ( entry.uiux.mode.isUpdate ) {
        formArgs.className = 'update';
        formArgs.confirmButtonLabel = ' τροποποίησης';

    } else if ( entry.uiux.mode.isDelete ) {
        formArgs.className = 'delete';
        formArgs.confirmButtonLabel = ' διαγραφής';
    }

    const [ data, setData ] = useState( { ...entry.data } );

    return (
        <Modal>
            <div className={`EntryForm ${formArgs.className}`}>

                <div className="id">
                    <span>Id:</span>
                    <input 
                        value={data.id}
                        readOnly
                    />
                </div>

                <div className="date">
                    <span>Ημ/νία:</span>
                    <input 
                        value={dateInfo}
                        readOnly
                    />
                </div>

                <div className="note">
                    <span>Σημείωμα:</span>
                    <textarea
                        rows="10"
                        cols="50"
                        maxLength="1000"
                        value={data.note}
                        onChange={event => setData( { ...data, note: event.target.value } )}
                    />
                </div>

                <div className='buttons'>

                    <span></span>

                    <button onClick={event => {
                        entry.data = { ...data };
                        REF.current.entryRequest( date, inSequence );
                    }}>
                        {entry.uiux.db.isOnRequest
                            ? <Loader /> 
                            : <FontAwesomeIcon icon={ faCheck } className="icon" />}
                        <span className='text'>{`Επιβεβαίωση ${formArgs.confirmButtonLabel}`}</span>
                    </button>

                    <button
                        onClick={event => REF.current.closeEntryForm( event, date, inSequence )}
                    >
                        <FontAwesomeIcon icon={ faTimes } className="icon" />
                        <span className='text'>Ακύρωση</span>
                    </button>

                </div>
            </div>
        </Modal>
    );
}

export default EntryForm;
