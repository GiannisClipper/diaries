import React from 'react';
import { dayNames } from '../helpers/dates';
import { Modal } from './libs/Modal';
import { CRUDForm } from './libs/FormBox';
import { InputBox, InputLabel, InputValue } from './libs/InputBox';

function EntryForm( { 
        date, 
        entry, 
        inSequence, 
        formData, 
        closeForm, 
        doValidation, 
        doRequest, 
        children 
    } ) {

    const dateInfo = (
        dayNames[ date.getDay() ] + ' ' +
        date.getDate().toString().padStart( 2, '0' ) + '-' +
        ( date.getMonth() + 1 ).toString().padStart( 2, '0' ) + '-' +
        date.getFullYear()
    );

    const onClickOk = event => {
        entry.data = { ...formData };
        doValidation( date, inSequence );
        entry.uiux.mode.isCreate || entry.uiux.mode.isUpdate
            ? doValidation( date, inSequence )
            : doRequest( date, inSequence )
    }

    const onClickCancel = event => closeForm( event, date, inSequence );

    return (
        <Modal onClick={onClickCancel} centeredness>
            <CRUDForm
                mode={entry.uiux.mode}
                onClickOk={onClickOk}
                onClickCancel={onClickCancel}
                isOnRequest={entry.uiux.process.isOnRequest}
            >
                <InputBox>
                    <InputLabel>
                        Id
                    </InputLabel>
                    <InputValue>
                        <input 
                            value={formData.id || ''}
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
                            value={dateInfo}
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
