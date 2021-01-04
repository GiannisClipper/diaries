import React, { useContext, useEffect } from 'react';
import { CoreContext } from './CoreContext';

import { Loader } from '../libs/Loader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MenuOptionBox } from '../libs/MenuBox';

function CoreMenu( { process, children } ) {

    process = process || {};

    return ( 
        process.isValidation ||
        process.isRequestBefore ||
        process.isRequest ||
        process.isResponseWaiting ?
            <MenuOptionBox>
                <Loader />
            </MenuOptionBox>
        : process.isResponseError ?
            <MenuOptionBox>
                <FontAwesomeIcon icon={faBan} className="icon" />
            </MenuOptionBox>
        : 
            <>{ children }</>
    );
}

function CreateMenuOption( { reference } ) {

    const { openForm } = useContext( CoreContext );

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

function RetrieveMenuOption( { reference } ) {

    const { openForm } = useContext( CoreContext );

    return (
        <MenuOptionBox 
            ref={ reference }
            onClick={ () => openForm( { mode: { isRetrieve: true } } ) }
        >
            <FontAwesomeIcon 
                className="icon" 
                icon={ faEdit } 
                title="Ανάκτηση δεδομένων"
            />
        </MenuOptionBox>
    )
}

function UpdateMenuOption( { reference } ) {

    const { openForm } = useContext( CoreContext );

    return (
        <MenuOptionBox 
            ref={ reference }
            onClick={ () => openForm( { mode: { isUpdate: true } } ) }
        >
            <FontAwesomeIcon 
                className="icon" 
                icon={ faEdit } 
                title="Τροποποίηση εγγραφής" 
            />
        </MenuOptionBox>
    )
}

function DeleteMenuOption( { reference } ) {

    const { openForm } = useContext( CoreContext );

    return (
        <MenuOptionBox 
            ref={ reference }
            onClick={ () => openForm( { mode: { isDelete: true } } ) }
        >
            <FontAwesomeIcon 
                className="icon" 
                icon={ faTrashAlt } 
                title="Διαγραφή εγγραφής" 
            />
        </MenuOptionBox>
    )
}

function RetrieveManyMenuOption( { reference } ) {

    const { openForm } = useContext( CoreContext );

    return (
        <MenuOptionBox 
            ref={ reference }
            onClick={ () => openForm( { mode: { isRetrieveMany: true } } ) }
        >
            <FontAwesomeIcon 
                className="icon" 
                icon={ faEdit } 
                title="Ανάκτηση δεδομένων"
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