import React, { useState } from 'react';

import { Modal } from '../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputFromList } from '../libs/InputFromList';

import CoreForm from "../core/CoreForm";
import prepayAction from '../core/helpers/prepayAction';
import { isBlank } from '../core/helpers/validation';

import { AppContext } from '../app/AppContext';

function SettingsForm( { settings, actions, assets } ) {

    const closeForm = prepayAction( actions.closeForm, { assets } );

    const [ data, setData ] = useState( { ...settings } );

    const validationRules = () => {
        let errors = '';

        errors += isBlank( data.theme ) 
            ? 'Το Θέμα δεν μπορεί να είναι κενό.\n' : '';

        errors += isBlank( data.language ) 
            ? 'Η Γλώσσα δεν μπορεί να είναι κενή.\n' : '';

        return { data, errors };
    }

    return (
        <Modal onClick={ closeForm } centeredness>

            <CoreForm
                Context={ AppContext }
                assets={ assets }
                validationRules={ validationRules }
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
