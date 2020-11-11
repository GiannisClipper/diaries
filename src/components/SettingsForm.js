import React, { useState, useEffect } from 'react';
import { Modal } from './libs/Modal';
import { CRUDForm } from './libs/FormBox';
import { InputBox, InputLabel, InputValue } from './libs/InputBox';
import { InputDate } from './libs/InputDate';
import { isBlank } from '../helpers/validation';

function SettingsForm( { settings, closeForm, doValidation, validationDone, validationError, doRequest } ) {
    
    const [ data, setData ] = useState( { ...settings.data } );
    //const changes = Object.keys( data ).filter( x => data[ x ] !== user.data[ x ] );

    const onClickOk = event => {
        settings.uiux.mode.isUpdate
            ? doValidation()
            : doRequest()
    }

    const onClickCancel = closeForm;

    useEffect( () => {
    
        if ( settings.uiux.process.isOnValidation ) {

            let errors = '';
            errors += isBlank( data.theme ) ? 'Η Επιλογή Χρωματισμού δεν μπορεί να είναι κενή.\n' : '';

            settings.data = { ...data };

            if ( errors === '' ) {
                validationDone()

            } else {
                alert( errors );
                validationError();
            }

        } else if ( settings.uiux.process.isOnValidationDone ) {
            doRequest();
        }
    } );

    return (
        <Modal onClick={onClickCancel} centeredness>
            <CRUDForm
                mode={settings.uiux.mode}
                onClickOk={onClickOk}
                onClickCancel={onClickCancel}
                isOnRequest={settings.uiux.process.isOnRequest}
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
                        Επιλογή Χρωματισμού
                    </InputLabel>
                    <InputValue>
                        <input
                            value={data.theme}
                            onChange={event => setData( { ...data, theme: event.target.value } )}
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Κεντρική Hμ/νία
                    </InputLabel>
                    <InputValue>
                        <InputDate
                            value={data.centralDate}
                            onChange={event => setData( { ...data, centralDate: event.target.value } )}
                        />
                    </InputValue>
                </InputBox>

            </CRUDForm>
        </Modal>
    );
}

export default SettingsForm;
