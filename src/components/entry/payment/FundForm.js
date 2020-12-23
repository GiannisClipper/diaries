import React, { useState, useContext } from 'react';
import { Modal } from '../../libs/Modal';
import { CRUDContext, CRUDForm } from "../../libs/CRUD";
import { heads } from '../../../storage/texts';
import { InputBox, InputLabel, InputValue } from '../../libs/InputBox';
import { isBlank, isFound } from '../../../helpers/validation';

function FundForm( { funds, index } ) {
    
    const fund = funds[ index ];

    const [ data, setData ] = useState( { ...fund.data } );

    const { closeForm } = useContext( CRUDContext );

    const validation = () => {
        let errors = '';
        errors += isBlank( data.name ) ? 'Η Ονομασία δεν μπορεί να είναι κενή.\n' : '';
        errors += !isBlank( data.name ) && isFound( funds.map( x=> x.data.name), data.name, index ) ? 'Η Ονομασία υπάρχει ήδη.\n' : '';
        errors += !isBlank( data.code ) && isFound( funds.map( x=> x.data.code), data.code, index ) ? 'Ο Λογιστικός Κωδικός υπάρχει ήδη.\n' : '';
        return { data, errors };
    }

    return (
        <Modal onClick={closeForm} centeredness>
            <CRUDForm
                headLabel={heads.payment_funds}
                mode={fund.uiux.mode}
                process={fund.uiux.process}
                validation={validation}
            >
                <InputBox>
                    <InputLabel>
                        Id
                    </InputLabel>
                    <InputValue>
                        <input 
                            value={data.id || ''}
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
                            value={data.name}
                            onChange={event => setData( { ...data, name: event.target.value } )}
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Λογ.Κωδικ.
                    </InputLabel>
                    <InputValue>
                        <input
                            value={data.code}
                            onChange={event => setData( { ...data, code: event.target.value } )}
                        />
                    </InputValue>
                </InputBox>

            </CRUDForm>
        </Modal>
    );
}

export default FundForm;
