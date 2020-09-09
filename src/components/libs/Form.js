import React from 'react';
import '../../styles/libs/Form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Loader } from './Loader';

function Field( { className, label, children } ) {
    return (
        <div className={`Field ${className}`}>
            <span>
                {label}
            </span>
            <span>
                {children}
            </span>
        </div>
    );
}

function Form( { className, okLabel, cancelLabel, onClickOk, onClickCancel, isOnRequest, children } ) {

    okLabel = okLabel || 'ΟΚ';
    cancelLabel = cancelLabel || 'ΑΚΥΡΟ';

    return (
        <div className={`Form ${className}`}>

            {children}

            <Field className='buttons'>
                <button className="ok" onClick={onClickOk}>
                    {isOnRequest
                        ? <Loader /> 
                        : <FontAwesomeIcon className="icon" icon={ faCheck } />}
                    <span>{okLabel}</span>
                </button>

                <button className="cancel" onClick={onClickCancel}>
                    <FontAwesomeIcon className="icon" icon={ faTimes } />
                    <span>{cancelLabel}</span>
                </button>
            </Field>

        </div> 
    );
}

export { Field, Form };
