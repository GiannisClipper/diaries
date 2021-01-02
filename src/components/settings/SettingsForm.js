import React, { useState, useContext } from 'react';

import { AppContext } from '../app/AppContext';
import { CoreContext } from "../core/CoreContext";
import CoreForm from "../core/CoreForm";

import { Modal } from '../libs/Modal';
import { heads } from '../../storage/texts';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputFromList } from '../libs/InputFromList';
import { isBlank } from '../../helpers/validation';

function SettingsForm( { index } ) {

    const { state } = useContext( AppContext );
    const { settings } = state;
    const { _uiux } = settings;

    const { closeForm } = useContext( CoreContext );

    const [ data, setData ] = useState( { ...settings } );

    const validation = () => {
        let errors = '';

        errors += isBlank( data.theme ) 
            ? 'Το `Χρωματικό Θέμα` δεν μπορεί να είναι κενό.\n' : '';

        return { data, errors };
    }

    return (
        <Modal onClick={ closeForm } centeredness>

            <CoreForm
                headLabel={ heads.settings }
                mode={ _uiux.mode }
                process={ _uiux.process }
                validation={ validation }
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
                        Χρωματικό Θέμα
                    </InputLabel>
                    <InputValue>
                        <InputFromList
                            value={ data.theme }
                            allValues={ [ 'light', 'dark' ] }
                            onChange={ event => setData( { ...data, theme: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

            </CoreForm>
        </Modal>
    );
}

export default SettingsForm;
export { SettingsForm };
