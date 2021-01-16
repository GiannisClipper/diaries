import React, { useState, useContext } from 'react';
import { FundsContext } from './FundsContext';
import { Modal } from '../../libs/Modal';
import CoreForm from "../../core/CoreForm";
import { InputBox, InputLabel, InputValue } from '../../libs/InputBox';
import { isBlank, isFound } from '../../core/helpers/validation';

function FundForm( { index } ) {
    
    const { state, actions } = useContext( FundsContext );
    const { funds } = state;
    const fund = funds[ index ];

    const closeForm = payload => actions.closeForm( { index, ...payload } );

    const [ data, setData ] = useState( { ...fund } );

    const validationRules = () => {
        let errors = '';

        errors += isBlank( data.name ) 
            ? 'Η Ονομασία δεν μπορεί να είναι κενή.\n' : '';

        errors += !isBlank( data.name ) && isFound( funds.map( x=> x.name), data.name, index ) 
            ? 'Η Ονομασία υπάρχει ήδη.\n' : '';

        errors += !isBlank( data.code ) && isFound( funds.map( x=> x.code), data.code, index ) 
            ? 'Ο Λογιστικός Κωδικός υπάρχει ήδη.\n' : '';

        return { data, errors };
    }

    return (
        <Modal onClick={ closeForm } centeredness>

            <CoreForm
                Context={ FundsContext }
                index={ index }
                validationRules={ validationRules }
            >
                <InputBox>
                    <InputLabel>
                        Id
                    </InputLabel>
                    <InputValue>
                        <input 
                            value={ data.id || '' }
                            tabIndex="-1"
                            readOnly
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Ονομασία
                    </InputLabel>
                    <InputValue>
                        <input
                            value={ data.name }
                            onChange={ event => setData( { ...data, name: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Λογ.Κωδικ.
                    </InputLabel>
                    <InputValue>
                        <input
                            value={ data.code }
                            onChange={ event => setData( { ...data, code: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

            </CoreForm>
        </Modal>
    );
}

export default FundForm;
export { FundForm };