import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { MenuOptionBox } from '../libs/MenuBox';
import { SuspendedTool } from '../libs/Tools';
import { Loader } from '../libs/Loader';

function CoreMenu( { status, children } ) {

    status = status || {};

    return ( 
        status.isValidation ||
        status.isRequestBefore ||
        status.isRequest ||
        status.isResponseWaiting 
        ?
            <MenuOptionBox>
                <Loader />
            </MenuOptionBox>
        : 
        status.isResponseError ||
        status.isResponseErrorAfter 
        ?
            <MenuOptionBox>
                <SuspendedTool />
            </MenuOptionBox>
        : 
            <>{ children }</>
    );
}

function CreateMenuOption( { reference, openForm } ) {

    return (
        <MenuOptionBox 
            ref={ reference }
            onClick={ () => openForm( { mode: { isCreate: true } } ) }
        >
            <FontAwesomeIcon 
                className="icon" 
                icon={ faEdit } 
                title="Νέα εγγραφή" 
            />
        </MenuOptionBox>
    )
}

function RetrieveMenuOption( { reference, openForm } ) {

    return (
        <MenuOptionBox 
            ref={ reference }
            onClick={ () => openForm( { mode: { isRetrieve: true } } ) }
        >
            <FontAwesomeIcon 
                className="icon" 
                icon={ faEdit } 
                title="Ανάκτηση"
            />
        </MenuOptionBox>
    )
}

function UpdateMenuOption( { reference, openForm } ) {

    return (
        <MenuOptionBox 
            ref={ reference }
            onClick={ () => openForm( { mode: { isUpdate: true } } ) }
        >
            <FontAwesomeIcon 
                className="icon" 
                icon={ faEdit } 
                title="Τροποποίηση" 
            />
        </MenuOptionBox>
    )
}

function DeleteMenuOption( { reference, openForm } ) {

    return (
        <MenuOptionBox 
            ref={ reference }
            onClick={ () => openForm( { mode: { isDelete: true } } ) }
        >
            <FontAwesomeIcon 
                className="icon" 
                icon={ faTrashAlt } 
                title="Διαγραφή" 
            />
        </MenuOptionBox>
    )
}

function RetrieveManyMenuOption( { reference, openForm } ) {

    return (
        <MenuOptionBox 
            ref={ reference }
            onClick={ () => openForm( { mode: { isRetrieveMany: true } } ) }
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