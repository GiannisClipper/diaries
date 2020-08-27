import React, { useContext } from 'react';
import '../styles/Form.css';
import { AppContext } from './AppContext';

function Form() {

    const { state, dispatch } = useContext( AppContext );
    const { uiux } = state;

    const className = uiux.form.isOpen ? "modal display-block" : "modal display-none";

    const handleClose = event => dispatch( { type: 'CLOSE_FORM' } );

    return (
        <div className={className}>
            <section className="modal-form">
                <button onClick={handleClose}>close</button>
            </section>
        </div>
    );
}

export default Form;
