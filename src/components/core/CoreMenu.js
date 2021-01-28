import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { MenuOptionBox } from '../libs/MenuBox';
import { LoadingIcon, SuspendedIcon } from '../libs/Icons';

function CoreMenu( { status, children } ) {

    status = status || {};

    return ( 
        status.isValidation ||
        status.isRequestBefore ||
        status.isRequest ||
        status.isResponseWaiting 
        ?
            <LoadingIcon />
        : 
        status.isResponseError ||
        status.isResponseErrorAfter 
        ?
            <SuspendedIcon />
        : 
            <>{ children }</>
    );
}

function CreateMenuOption( { reference, createMode, openForm } ) {

    return (
        <MenuOptionBox 
            ref={ reference }
            onClick={ () => { createMode(); openForm(); } }
        >
            <FontAwesomeIcon 
                className="icon" 
                icon={ faEdit } 
                title="Νέα εγγραφή" 
            />
        </MenuOptionBox>
    )
}

function RetrieveMenuOption( { reference, retrieveMode, openForm } ) {

    return (
        <MenuOptionBox 
            ref={ reference }
            onClick={ () => { retrieveMode(); openForm(); } }
        >
            <FontAwesomeIcon 
                className="icon" 
                icon={ faEdit } 
                title="Ανάκτηση"
            />
        </MenuOptionBox>
    )
}

function UpdateMenuOption( { reference, updateMode, openForm } ) {

    return (
        <MenuOptionBox 
            ref={ reference }
            onClick={ () => { updateMode(); openForm(); } }
        >
            <FontAwesomeIcon 
                className="icon" 
                icon={ faEdit } 
                title="Τροποποίηση" 
            />
        </MenuOptionBox>
    )
}

function DeleteMenuOption( { reference, deleteMode, openForm } ) {

    return (
        <MenuOptionBox 
            ref={ reference }
            onClick={ () => { deleteMode(); openForm(); } }
        >
            <FontAwesomeIcon 
                className="icon" 
                icon={ faTrashAlt } 
                title="Διαγραφή" 
            />
        </MenuOptionBox>
    )
}

function RetrieveManyMenuOption( { reference, retrieveManyMode, openForm } ) {

    return (
        <MenuOptionBox 
            ref={ reference }
            onClick={ () => { retrieveManyMode(); openForm(); } }
        >
            <FontAwesomeIcon 
                className="icon" 
                icon={ faEdit } 
                title="Ανάκτηση"
            />
        </MenuOptionBox>
    )
}

export default CoreMenu;
export { 
    CoreMenu,
    CreateMenuOption,
    RetrieveMenuOption,
    UpdateMenuOption,
    DeleteMenuOption,
    RetrieveManyMenuOption,
};