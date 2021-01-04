import React, { useState, useContext } from 'react';

import { AppContext } from '../app/AppContext';
import { CoreContext } from "../core/CoreContext";
import CoreForm from "../core/CoreForm";

import { Modal } from '../libs/Modal';
import { heads } from '../../storage/texts';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';

function BackupForm() {

    const { state } = useContext( AppContext );
    const { backup } = state;
    const { _uiux } = backup;

    const { closeForm } = useContext( CoreContext );

    return (
        <Modal onClick={ closeForm } centeredness>

            <CoreForm
                headLabel={ heads.backup }
                mode={ { isRetrieve: true } }
                process={ _uiux.process }
            >

                <InputBox>
                    <InputLabel />
                    <InputValue>
                        <input 
                            value={ `Αντίγραφο βάσης δεδομένων σε αρχείο json.` }
                            tabIndex="-1"
                            readOnly
                        />
                    </InputValue>
                </InputBox>

            </CoreForm>
        </Modal>
    );
}

export default BackupForm;
export { BackupForm };
