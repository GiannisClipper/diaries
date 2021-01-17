import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEllipsisH, 
    faEdit, 
    faFont, 
    faEuroSign, 
    faTrashAlt, 
    faCut, 
    faCamera, 
    faClone, 
    faTimes, 
    faBan 
} from '@fortawesome/free-solid-svg-icons';

import { ToolBox } from './ToolBox';

function Tool( { icon, title, onClick, reference } ) {
    return (
        <ToolBox onClick={ onClick } ref={ reference }>
            <FontAwesomeIcon icon={ icon } className="icon" title={ title } />
        </ToolBox>
    )
}

const MenuTool = ( { onClick, reference } ) => 
    <Tool 
        icon={ faEllipsisH } 
        title='Menu'
        onClick={ onClick }
        reference={ reference }
    />

const AddNoteTool = ( { onClick } ) => 
    <Tool 
        icon={ faFont } 
        title='Νέο σημείωμα'
        onClick={ onClick }
    />

const AddPaymentTool = ( { onClick } ) => 
    <Tool 
        icon={ faEuroSign } 
        title='Νέα πληρωμή'
        onClick={ onClick }
    />

const EditTool = ( { onClick } ) => 
    <Tool 
        icon={ faEdit } 
        title='Επεξεργασία'
        onClick={ onClick }
    />

const DeleteTool = ( { onClick } ) => 
    <Tool 
        icon={ faTrashAlt } 
        title='Διαγραφή'
        onClick={ onClick }
    />

const CutTool = ( { onClick } ) => 
    <Tool 
        icon={ faCut } 
        title='Αποκοπή'
        onClick={ onClick }
    />

const CopyTool = ( { onClick } ) => 
    <Tool 
        icon={ faCamera } 
        title='Αντιγραφή'
        onClick={ onClick }
    />

const PasteTool = ( { onClick, disabled } ) => 
    <Tool 
        icon={ faClone } 
        title='Επικόλληση'
        onClick={ onClick }
        disabled={ disabled }
    />

const CloseTool = ( { onClick } ) => 
    <Tool 
        icon={ faTimes } 
        title='Κλείσιμο'
        onClick={ onClick }
    />

const SuspendedTool = () => 
    <Tool 
        icon={ faBan } 
        disabled={ true }
    />

export { 
    Tool, 
    MenuTool, 
    AddNoteTool, 
    AddPaymentTool, 
    EditTool, 
    DeleteTool, 
    CutTool, 
    CopyTool, 
    PasteTool, 
    CloseTool, 
    SuspendedTool 
};
