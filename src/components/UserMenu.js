import React from 'react';
import { EditTool, DeleteTool } from './libs/Tools';

function UserMenu( { openForm, mode } ) {
    return (
        <div>
            <EditTool onClick={event => openForm( mode )} />
            {mode.isCreate
                ? null
                : <DeleteTool onClick={event => openForm( { isDelete: true } )} />
            }
        </div>
    );
}

export default UserMenu;