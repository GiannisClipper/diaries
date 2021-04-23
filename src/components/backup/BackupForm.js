import React, { useEffect } from 'react';

import { Modal } from '../commons/Modal';
import { InputBox, InputLabel, InputValue } from '../commons/InputBox';

import CoreForm from "../core/CoreForm";
import presetAction from '../core/helpers/presetAction';
import { validationFeature } from "../core/features/validation";

import { AppContext } from '../app/AppContext';

function BackupForm( { backup, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets } );
    const noMode = presetAction( actions.noMode, { assets } );
    const onClickOut = () => { closeForm(); noMode() };

    const { status } = backup._uiux;
 
    useEffect( () => {
        validationFeature( { 
            actions,
            assets,
            status,
        } );
    } );

    return (
        <Modal onClick={ onClickOut } centeredness>

            <CoreForm
                headLabel={ lexicon.backup.backup }
                Context={ AppContext }
                assets={ assets }
                lexicon={ lexicon }
            >
                <InputBox>
                    <InputLabel />
                    <InputValue>
                        <input 
                            value={ lexicon.backup.descr }
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
