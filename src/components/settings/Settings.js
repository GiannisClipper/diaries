import React, { useContext, useEffect  } from 'react';

import { AppContext } from '../app/AppContext';
import { parseSettingsToDB } from '../../storage/settings/parsers';

import { CRUDContextProvider, UpdateRequest, CRUDMenu } from '../libs/CRUD';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import SettingsForm from './SettingsForm';

function Settings() {

    const { state, dispatch } = useContext( AppContext );
    const { settings } = state;
    const { _uiux } = settings;

    const payload = { _saved: settings };
    const dataToDB = parseSettingsToDB( settings );

    return (
        <CRUDContextProvider 
            dispatch={ dispatch }
            namespace={ 'settings' }
            payload={ payload }
        >
    
            <UpdateRequest 
                process={ _uiux.process }
                url={ `/.netlify/functions/settings` }
                dataToDB={ dataToDB }
                body={ JSON.stringify( { data: dataToDB } ) }
            />

            <RowBox>
                <RowValue title={ `${settings.id}` }>
                    <div>{ `Χρωματικό Θέμα: ${settings.theme}` }</div>
                    <br />
                    <div>{ `Perhaps more settings...` }</div>
                    <br />
                </RowValue>

                <RowMenu>
                    <CRUDMenu
                        options={ [ 'U' ] }
                        process={ _uiux.process }
                    />
                </RowMenu>

                { _uiux.form.isOpen ?
                    <SettingsForm /> 
                : null }
            </RowBox> 
    
        </CRUDContextProvider>
    );
}

export default Settings;
export { Settings };