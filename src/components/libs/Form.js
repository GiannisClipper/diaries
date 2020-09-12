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

function CRUDForm( { className, mode, onClickOk, onClickCancel, isOnRequest, children } ) {

    let okLabel, cancelLabel;

    okLabel = 'Επιβεβαίωση';
    cancelLabel = 'Ακύρωση';

    if ( mode.isCreate ) {
        className += ' create';
        okLabel += ' νέας εγγραφής';

    } else if ( mode.isUpdate ) {
        className += ' update';
        okLabel += ' τροποποίησης';

    } else if ( mode.isDelete ) {
        className += ' delete';
        okLabel += ' διαγραφής';
    }

    return (
        <Form
            className={className}
            okLabel={okLabel}
            cancelLabel={cancelLabel}
            onClickOk={onClickOk}
            onClickCancel={onClickCancel}
            isOnRequest={isOnRequest}
        >
            {children}
        </Form>
    );
}

export { Field, Form, CRUDForm };
