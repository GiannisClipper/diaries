import React from 'react';

import { Modal } from '../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';

import CoreForm from "../core/CoreForm";
import presetAction from '../core/helpers/presetAction';

import { AppContext } from '../app/AppContext';

function BackupForm( { backup, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets } );
    const noMode = presetAction( actions.noMode, { assets } );
    const onClickOut = () => { closeForm(); noMode() };

    return (
        <Modal onClick={ onClickOut } centeredness>

            <CoreForm
                headLabel={ lexicon.backup }
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
