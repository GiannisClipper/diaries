import React, { useState } from 'react';

import { Modal } from '../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputFromListSelecting } from '../libs/InputFromList';

import CoreForm from "../core/CoreForm";
import presetAction from '../core/helpers/presetAction';
import validators from '../core/assets/validators';
import withLexicon from '../core/helpers/withLexicon';

import { AppContext } from '../app/AppContext';

function SettingsForm( { settings, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets } );
    const noMode = presetAction( actions.noMode, { assets } );
    const onClickOut = () => { closeForm(); noMode() };

    const [ data, setData ] = useState( { ...settings } );

    const onValidation = () => {
        let errors = [];

        const isBlank = withLexicon( validators.isBlank, lexicon );

        errors.push( isBlank( lexicon.settings.theme, data.theme ) );
        errors.push( isBlank( lexicon.settings.language, data.language ) );

        errors = errors.filter( x => x !== null );

        return { data, errors };
    }

    return (
        <Modal onClick={ onClickOut } centeredness>

            <CoreForm
                headLabel={ lexicon.settings.settings }
                Context={ AppContext }
                assets={ assets }
                lexicon={ lexicon }
                onValidation={ onValidation }
            >

                <InputBox>
                    <InputLabel>
                        { lexicon.settings.theme }
                    </InputLabel>
                    <InputValue>
                        <InputFromListSelecting
                            value={ data.theme }
                            allValues={ [ 'LIGHT', 'DARK' ] }
                            onChange={ event => setData( { ...data, theme: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        { lexicon.settings.language }
                    </InputLabel>
                    <InputValue>
                        <InputFromListSelecting
                            value={ data.language }
                            allValues={ [ 'EN', 'GR' ] }
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
