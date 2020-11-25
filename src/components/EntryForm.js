import React, { useContext } from 'react';
import { CRUDContext, CRUDForm } from "./libs/CRUD";
import { Modal } from './libs/Modal';
import { InputBox, InputLabel, InputValue } from './libs/InputBox';
import { dayNames, YYYMMDDToRepr, dateToYYYYMMDD } from '../helpers/dates';

function EntryForm( { headLabel, date, entry, children } ) {

    const { closeForm } = useContext( CRUDContext );

    return (
        <Modal onClick={closeForm} centeredness>
            <CRUDForm
                headLabel={headLabel}
                mode={entry.uiux.mode}
                isOnRequest={entry.uiux.process.isOnRequest}
            >
                <InputBox>
                    <InputLabel>
                        Id
                    </InputLabel>
                    <InputValue>
                        <input 
                            value={entry.id || ''}
                            tabIndex="-1"
                            readOnly
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Ημ/νία
                    </InputLabel>
                    <InputValue>
                        <input 
                            value={`${dayNames[ date.getDay() ]} ${YYYMMDDToRepr( dateToYYYYMMDD( date ), 'D-M-Y' )}`}
                            tabIndex="-1"
                            readOnly
                        />
                    </InputValue>
                </InputBox>

                {children}

            </CRUDForm>
        </Modal>
    );
}

export default EntryForm;
