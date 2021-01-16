import React, { useState, useContext } from 'react';
import { AppContext } from '../app/AppContext';
import { Modal } from '../libs/Modal';
import CoreForm from "../core/CoreForm";
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';

function BackupForm() {

    const { actions, assets } = useContext( AppContext );

    const closeForm = payload => actions.closeForm( { ...payload, assets: assets.backup } );

    return (
        <Modal onClick={ closeForm } centeredness>

            <CoreForm
                Context={ AppContext }
                assets={ assets.backup }
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
