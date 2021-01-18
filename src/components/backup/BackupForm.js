import React from 'react';

import { Modal } from '../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';

import CoreForm from "../core/CoreForm";
import prepayAction from '../core/helpers/prepayAction';

import { AppContext } from '../app/AppContext';

function BackupForm( { backup, actions, assets } ) {

    console.log(actions)
    const closeForm = prepayAction( actions.closeForm, { assets } );

    return (
        <Modal onClick={ closeForm } centeredness>

            <CoreForm
                Context={ AppContext }
                assets={ assets }
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
