import React, { useContext } from 'react';
import '../styles/Form.css';
import { STATEContext } from './STATEContext';

function Form( { date, entry, pos } ) {

    const STATE = useContext( STATEContext );

    const className = entry.uiux.form.isOpen ? "modal display-block" : "modal display-none";

    const closeForm = ( event, date, pos ) => {
        event.stopPropagation();

        STATE.dispatch( { 
            type: 'CLOSE_ENTRY_FORM',
            payload: { date, pos },
        } );
    }

    return (
        <div className={className}>
            <section className="modal-form">
                <button onClick={event => closeForm( event, date, pos )}>close</button>
            </section>
        </div>
    );
}

export default Form;
