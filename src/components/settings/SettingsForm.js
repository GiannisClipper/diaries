import React, { useState } from 'react';

import { Modal } from '../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputFromList } from '../libs/InputFromList';

import CoreForm from "../core/CoreForm";
import presetAction from '../core/helpers/presetAction';
import { isBlank } from '../core/assets/validators';

import { AppContext } from '../app/AppContext';

function SettingsForm( { settings, actions, assets } ) {

    const closeForm = presetAction( actions.closeForm, { assets } );
    const noMode = presetAction( actions.noMode, { assets } );
    const onClickOut = () => { closeForm(); noMode() };

    const [ data, setData ] = useState( { ...settings } );

    const validators = () => {
        let errors = [];

        errors.push( isBlank( 'Θέμα', data.theme ) );
        errors.push( isBlank( 'Γλώσσα', data.language ) );

        errors = errors.filter( x => x !== null );

        return { data, errors };
    }

    return (
        <Modal onClick={ onClickOut } centeredness>

            <CoreForm
                Context={ AppContext }
                assets={ assets }
                validators={ validators }
            >

                <InputBox>
                    <InputLabel>
                        Θέμα
                    </InputLabel>
                    <InputValue>
                        <InputFromList
                            value={ data.theme }
                            allValues={ [ 'light', 'dark' ] }
                            onChange={ event => setData( { ...data, theme: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Γλώσσα
                    </InputLabel>
                    <InputValue>
                        <InputFromList
                            value={ data.language }
                            allValues={ [ 'English', 'Greek' ] }
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
