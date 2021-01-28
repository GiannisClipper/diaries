import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEllipsisH, 
    faEdit, 
    faTrashAlt, 
    faCut, 
    faCamera, 
    faClone, 
    faTimes, 
    faBan,
    faSyncAlt
} from '@fortawesome/free-solid-svg-icons';

import { IconBox, RotatingBox, ToolBox } from './IconBox';

function Icon( { icon, title } ) {
    return (
        <IconBox>
            <FontAwesomeIcon icon={ icon } className="icon" title={ title } />
        </IconBox>
    )
}

function RotatingIcon( { icon, title } ) {
    return (
        <RotatingBox>
            <FontAwesomeIcon icon={ icon } className="icon" title={ title } />
        </RotatingBox>
    )
}

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

const SuspendedIcon = () => 
    <Icon
        icon={ faBan } 
        // disabled={ true }
    />

const LoadingIcon = () =>
    <RotatingIcon
        icon={ faSyncAlt }
    />


export { 
    Tool, 
    MenuTool, 
    EditTool, 
    DeleteTool, 
    CutTool, 
    CopyTool, 
    PasteTool, 
    CloseTool, 
    SuspendedIcon,
    LoadingIcon
};
