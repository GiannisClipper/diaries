import React, { useContext } from 'react';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import { UpdateRequest } from '../core/CoreRequests';
import { CoreMenu, UpdateMenuOption } from '../core/CoreMenu';
import presetAction from '../core/helpers/presetAction';

import { AppContext } from '../app/AppContext';

import assets from './assets/assets';
import SettingsForm from './SettingsForm';

function Settings() {

    const { state, actions } = useContext( AppContext );
    const { settings } = state;
    const { _uiux } = settings;

    const updateMode = presetAction( actions.updateMode, { assets } );
    const openForm = presetAction( actions.openForm, { assets } );

    return (
        <>
            <UpdateRequest 
                Context={ AppContext }
                assets={ assets }
                url={ `/.netlify/functions/settings` }
            />

            <RowBox>
                <RowValue title={ `${ settings.id }` }>
                    <div>{ `Επιλογή θέματος: ${ settings.theme }` }</div>
                    <br />
                    <div>{ `Επιλογή γλώσσας: ${ settings.language }` }</div>
                    <br />
                </RowValue>

                <RowMenu>
                    <CoreMenu status={ _uiux.status } >
                        <UpdateMenuOption 
                            updateMode={ updateMode }
                            openForm={ openForm }
                        />
                    </CoreMenu>
                </RowMenu>
            </RowBox> 

            { _uiux.form.isOpen ?
                <SettingsForm
                    settings={ settings }
                    actions={ actions }
                    assets={ assets }
                /> 
            : null }

        </>
    );
}

export default Settings;
export { Settings };