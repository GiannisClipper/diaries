import React, { useContext, useEffect  } from 'react';

import { CoreContextProvider } from '../core/CoreContext';
import actions from '../../storage/core/actions';
import { settingsSchema } from '../../storage/schemas';
import { parseSettingsFromDB } from '../../storage/settings/parsers';
import { UpdateRequest } from '../core/CoreRequests';
import CoreMenu from '../core/CoreMenu';

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
                process={ _uiux.process }
                url={ `/.netlify/functions/settings` }
                dataToDB={ dataToDB }
                body={ JSON.stringify( { data: dataToDB } ) }
            />

            <RowBox>
                <RowValue title={ `${settings.id}` }>
                    <div>{ `Χρωματικό θέμα: ${settings.theme}` }</div>
                    <br />
                    <div>{ `Perhaps more settings...` }</div>
                    <br />
                </RowValue>

                <RowMenu>
                    <CoreMenu
                        options={ [ 'U' ] }
                        process={ _uiux.process }
                    />
                </RowMenu>

                { _uiux.form.isOpen ?
                    <SettingsForm /> 
                : null }
            </RowBox> 
    
        </CoreContextProvider>
    );
}

export default Settings;
export { Settings };