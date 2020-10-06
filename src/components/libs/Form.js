import React from 'react';
import '../../styles/libs/Form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Loader } from './Loader';

function Field( { className, label, children } ) {
  
    return (
        <div className={`Field ${className}`}>
            <span className='label'>
                {label}
            </span>
            <span className='value'>
                {children}
            </span>
        </div>
    );
}

function Form( { className, children } ) {

    return (
        <div className={`Form ${className}`}>
            {children}
        </div> 
    );
}

function OkForm( { className, okLabel, onClickOk, isOnRequest, children } ) {

    className = `OkForm ${className}`

    okLabel = okLabel || 'ΟΚ';

    return (
        <Form
            className={className}
        >
            {children}

            <Field className='buttons'>
                <button className="ok" onClick={onClickOk}>
                    {isOnRequest
                        ? <Loader /> 
                        : <FontAwesomeIcon className="icon" icon={ faCheck } />}
                    <span>{okLabel}</span>
                </button>
            </Field>

        </Form>
    );
}

function OkCancelForm( { className, okLabel, cancelLabel, onClickOk, onClickCancel, isOnRequest, children } ) {

    className = `OkCancelForm ${className}`

    okLabel = okLabel || 'ΟΚ';
    cancelLabel = cancelLabel || 'ΑΚΥΡΟ';

    return (
        <Form
            className={className}
        >
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

        </Form>
    );
}

function CRUDForm( { className, mode, onClickOk, onClickCancel, isOnRequest, children } ) {

    className = `CRUDForm ${className}`

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
        <OkCancelForm
            className={className}
            okLabel={okLabel}
            cancelLabel={cancelLabel}
            onClickOk={onClickOk}
            onClickCancel={onClickCancel}
            isOnRequest={isOnRequest}
        >
            {children}
        </OkCancelForm>
    );
}

export { Field, Form, OkForm, OkCancelForm, CRUDForm };
