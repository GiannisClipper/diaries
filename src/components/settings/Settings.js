import React, { useContext } from 'react';
import { AppContext } from '../app/AppContext';
import { UpdateRequest } from '../core/CoreRequests';
import { RowBox, RowValue, RowMenu } from '../libs/RowBox';
import { CoreMenu, UpdateMenuOption } from '../core/CoreMenu';
import SettingsForm from './SettingsForm';

function Settings() {

    const { state, actions, assets } = useContext( AppContext );
    const { settings } = state;
    const { _uiux } = settings;

    const openForm = payload => actions.openForm( { ...payload, assets: assets.settings } );

    return (
        <>
            <UpdateRequest 
                Context={ AppContext }
                assets={ assets.settings }
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
                        <UpdateMenuOption openForm={ openForm } />
                    </CoreMenu>
                </RowMenu>
            </RowBox> 

            { _uiux.form.isOpen ?
                <SettingsForm /> 
            : null }

        </>
    );
}

export default Settings;
export { Settings };