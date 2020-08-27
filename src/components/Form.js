import React, { useContext } from 'react';
import '../styles/Form.css';
import { UIUXContext } from './UIUXContext';

function Form() {

    const { state, dispatch } = useContext( UIUXContext );

    const className = state.form.isOpen ? "modal display-block" : "modal display-none";

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
