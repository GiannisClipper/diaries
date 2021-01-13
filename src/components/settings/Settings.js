import React, { useContext, useEffect  } from 'react';

import { CoreContextProvider } from '../core/CoreContext';
import actions from '../../storage/core/actions';
import { settingsSchema } from '../../storage/schemas';
import { parseSettingsFromDB } from '../../storage/settings/parsers';
import { UpdateRequest } from '../core/CoreRequests';
import { CoreMenu, UpdateMenuOption } from '../core/CoreMenu';

import { AppContext } from '../app/AppContext';
import { parseSettingsToDB } from '../../storage/settings/parsers';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import SettingsForm from './SettingsForm';

function Settings() {

    const { state, dispatch } = useContext( AppContext );
    const { settings } = state;
    const { _uiux } = settings;

    const payload = { 
        _namespace: 'settings', 
        _saved: settings,
        _schema: settingsSchema,
        _parseFromDB: parseSettingsFromDB,
        _sort: null,
    };

    const dataToDB = parseSettingsToDB( settings );

    return (
        <CoreContextProvider 
            actions={ [ 
                actions.form,
                actions.validation,
                actions.updateOne,
            ] }
            dispatch={ dispatch }
            namespace={ 'settings' }
            payload={ payload }
        >
    
            <UpdateRequest 
                status={ _uiux.status }
                url={ `/.netlify/functions/settings` }
                dataToDB={ dataToDB }
                body={ JSON.stringify( { data: dataToDB } ) }
                error={ _uiux.error }
            />

            <RowBox>
                <RowValue title={ `${settings.id}` }>
                    <div>{ `Επιλογή θέματος: ${settings.theme}` }</div>
                    <br />
                    <div>{ `Επιλογή γλώσσας: ${settings.language}` }</div>
                    <br />
                </RowValue>

                <RowMenu>
                    <CoreMenu status={ _uiux.status } >
                        <UpdateMenuOption />
                    </CoreMenu>
                </RowMenu>
            </RowBox> 

            { _uiux.form.isOpen ?
                <SettingsForm /> 
            : null }

        </CoreContextProvider>
    );
}

export default Settings;
export { Settings };