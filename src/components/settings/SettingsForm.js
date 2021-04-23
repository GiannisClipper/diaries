import React, { useState, useEffect } from 'react';

import { Modal } from '../commons/Modal';
import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputSelectingList } from '../commons/InputList';

import CoreForm from "../core/CoreForm";
import presetAction from '../core/helpers/presetAction';
import { validationFeature } from "../core/features/validation";

import { AppContext } from '../app/AppContext';

function SettingsForm( { settings, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets } );
    const noMode = presetAction( actions.noMode, { assets } );
    const onClickOut = () => { closeForm(); noMode() };

    const { status } = settings._uiux;

    const [ data, setData ] = useState( { ...settings } );

    useEffect( () => {
        validationFeature( { 
            actions,
            assets,
            data,
            status,
        } );
    } );

    return (
        <Modal onClick={ onClickOut } centeredness>

            <CoreForm
                headLabel={ lexicon.settings.settings }
                Context={ AppContext }
                assets={ assets }
                lexicon={ lexicon }
            >

                <InputBox>
                    <InputLabel>
                        { lexicon.settings.theme }
                    </InputLabel>
                    <InputValue>
                        <InputSelectingList
                            value={ data.theme }
                            values={ [ 'LIGHT', 'DARK' ] }
                            onChange={ event => setData( { ...data, theme: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        { lexicon.settings.language }
                    </InputLabel>
                    <InputValue>
                        <InputSelectingList
                            value={ data.language }
                            values={ [ 'EN', 'GR' ] }
                            onChange={ event => setData( { ...data, language: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

            </CoreForm>
        </Modal>
    );
}

export default SettingsForm;
export { SettingsForm };
