import React from 'react';
import '../styles/UserMenu.css';
import { EditTool, DeleteTool } from './libs/Tools';

function UserMenu( { openForm, mode } ) {
    return (
        <div className='UserMenu'>
            <EditTool onClick={event => openForm( mode )} />
            {mode.isCreate
                ? null
                : <DeleteTool onClick={event => openForm( { isDelete: true } )} />
            }
        </div>
    );
}

export default UserMenu;