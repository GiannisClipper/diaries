import React from 'react';
import '../../styles/payments/GenreMenu.css';
import { EditTool, DeleteTool } from '../libs/Tools';

function GenreMenu( { openForm, mode } ) {
    return (
        <div className='payments GenreMenu'>
            <EditTool onClick={event => openForm( mode )} />
            {mode.isCreate
                ? null
                : <DeleteTool onClick={event => openForm( { isDelete: true } )} />
            }
        </div>
    );
}

export default GenreMenu;