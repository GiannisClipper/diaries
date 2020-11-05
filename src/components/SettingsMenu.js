import React from 'react';
import { EditTool } from './libs/Tools';

function SettingsMenu( { openForm, mode } ) {
    return (
        <div>
            <EditTool onClick={event => openForm( mode )} />
        </div>
    );
}

export default SettingsMenu;