import React, { useContext, useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../commons/RowBox';

import { CoreMenu, UpdateOption } from '../core/CoreMenu';
import presetAction from '../core/helpers/presetAction';
import { updateRequestFeature } from '../core/features/requests';

import { AppContext } from '../app/AppContext';

import assets from './assets/assets';
import SettingsForm from './SettingsForm';

function Settings( { lexicon } ) {

    const { state, actions } = useContext( AppContext );
    const { settings } = state;
    const { _uiux } = settings;

    const updateMode = presetAction( actions.updateMode, { assets } );
    const openForm = presetAction( actions.openForm, { assets } );

    // request feature

    useEffect( () => {

        updateRequestFeature( { 
            _item: settings,
            actions,
            assets,
            url: `/.netlify/functions/settings`
        } );

    }, [ settings, actions ] );
    
    return (
        <RowBox>

            <RowValue title={ `${ settings.id }` }>
                <div>{ `${ lexicon.settings.theme }: ${ settings.theme }` }</div>
                <br />
                <div>{ `${ lexicon.settings.language }: ${ settings.language }` }</div>
                <br />
            </RowValue>

            <RowMenu>
                <CoreMenu status={ _uiux.status } >
                    <UpdateOption 
                        lexicon={ lexicon }
                        onClick={ () => { 
                            updateMode(); 
                            openForm(); 
                        } }
                    />
            </CoreMenu>
            </RowMenu>

            { _uiux.form.isOpen ?
                <SettingsForm
                    settings={ settings }
                    actions={ actions }
                    assets={ assets }
                    lexicon={ lexicon }
                /> 
            : null }

        </RowBox> 
    );
}

export default Settings;
export { Settings };