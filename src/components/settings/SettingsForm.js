import React, { useState, useContext } from 'react';

import { AppContext } from '../app/AppContext';
import { CRUDContext, CRUDForm } from "../libs/CRUD";

import { Modal } from '../libs/Modal';
import { heads } from '../../storage/texts';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputFromList } from '../libs/InputFromList';
import { isBlank } from '../../helpers/validation';

function SettingsForm( { index } ) {

    const { state } = useContext( AppContext );
    const { settings } = state;
    const { _uiux } = settings;

    const { closeForm } = useContext( CRUDContext );

    const [ data, setData ] = useState( { ...settings } );

    const validation = () => {
        let errors = '';

        errors += isBlank( data.theme ) 
            ? 'Το Χρωματικό Θέμα δεν μπορεί να είναι κενό.\n' : '';

        return { data, errors };
    }

    return (
        <Modal onClick={ closeForm } centeredness>

            <CRUDForm
                headLabel={ heads.users }
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

            </CRUDForm>
        </Modal>
    );
}

export default SettingsForm;
export { SettingsForm };
