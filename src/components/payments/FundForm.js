import React, { useState, useEffect } from 'react';
import '../../styles/payments/FundForm.css';
import { Modal } from '../libs/Modal';
import { CRUDForm } from '../libs/Form';
import { Field } from '../libs/Field';
import { isBlank, isFound } from '../../helpers/validation';

function FundForm( { funds, index, closeForm, doValidation, validationDone, validationError, doRequest } ) {
    
    const fund = funds[ index ];

    const [ data, setData ] = useState( { ...fund.data } );
    //const changes = Object.keys( data ).filter( x => data[ x ] !== fund.data[ x ] );

    const onClickOk = event => {
        fund.data = { ...data };
        fund.uiux.mode.isCreate || fund.uiux.mode.isUpdate
            ? doValidation( index )
            : doRequest( index )
    }

    const onClickCancel = closeForm;

    useEffect( () => {
    
        if ( fund.uiux.process.isOnValidation ) {

            let errors = '';
            errors += isBlank( data.name ) ? 'Η Ονομασία δεν μπορεί να είναι κενή.\n' : '';
            errors += !isBlank( data.name ) && isFound( funds.map( x=> x.data.name), data.name, index ) ? 'Η Ονομασία υπάρχει ήδη.\n' : '';
            errors += !isBlank( data.code ) && isFound( funds.map( x=> x.data.code), data.code, index ) ? 'Ο Λογιστικός Κωδικός υπάρχει ήδη.\n' : '';

            if ( errors === '' ) {
                validationDone( index )

            } else {
                alert( errors );
                validationError( index );
            }

        } else if ( fund.uiux.process.isOnValidationDone ) {
            doRequest( index );
        }
    } );

    return (
        <Modal centeredness>
            <CRUDForm
                mode={fund.uiux.mode}
                onClickOk={onClickOk}
                onClickCancel={onClickCancel}
                isOnRequest={fund.uiux.process.isOnRequest}

            >
                <Field label="Id">
                    <input 
                        value={data.id || ''}
                        tabIndex="-1"
                        readOnly
                    />
                </Field>

                <Field label="Ονομασία">
                    <input
                        value={data.name}
                        onChange={event => setData( { ...data, name: event.target.value } )}
                    />
                </Field>

                <Field label="Λογ.Κωδικ.">
                    <input
                        value={data.code}
                        onChange={event => setData( { ...data, code: event.target.value } )}
                    />
                </Field>

            </CRUDForm>
        </Modal>
    );
}

export default FundForm;
