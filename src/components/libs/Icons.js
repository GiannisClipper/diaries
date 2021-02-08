import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBan,
    faSyncAlt,
    faEllipsisH, 
    faEdit,
    faSearch,
    faTrashAlt, 
    faCut, 
    faCamera, 
    faClone, 
    faTimes 
} from '@fortawesome/free-solid-svg-icons';

import { IconBox, RotatingBox } from './IconBox';

function Icon( { icon, title } ) {
    return (
        <IconBox>
            <FontAwesomeIcon icon={ icon } className="icon" title={ title } />
        </IconBox>
    )
}

function RotatingIcon( { icon, title } ) {
    return (
        <IconBox>
            <RotatingBox>
                <FontAwesomeIcon icon={ icon } className="icon" title={ title } />
            </RotatingBox>
        </IconBox>
    )
}

const LoadingIcon = ( { title } ) =>
    <RotatingIcon
        icon={ faSyncAlt }
        title={ title }
    />

const SuspendedIcon = ( { title } ) => 
    <Icon
        icon={ faBan } 
        title={ title }
        // disabled={ true }
    />

const MenuIcon = ( { title } ) => 
    <Icon
        icon={ faEllipsisH } 
        title={ title }
    />

const CreateIcon = ( { title } ) => 
    <Icon
        icon={ faEdit } 
        title={ title }
    />

const RetrieveIcon = ( { title } ) => 
    <Icon
        icon={ faSearch } 
        title={ title }
    />

const UpdateIcon = ( { title } ) => 
    <Icon
        icon={ faEdit } 
        title={ title }
    />

const DeleteIcon = ( { title } ) => 
    <Icon
        icon={ faTrashAlt } 
        title={ title }
    />

const CutIcon = ( { title } ) => 
    <Icon
        icon={ faCut } 
        title={ title }
    />

const CopyIcon = ( { title } ) => 
    <Icon
        icon={ faCamera } 
        title={ title }
    />

const PasteIcon = ( { title } ) => 
    <Icon
        icon={ faClone } 
        title={ title }
    />


const CloseIcon = ( { title } ) => 
    <Icon
        icon={ faTimes } 
        title={ title }
    />

export { 
    LoadingIcon,
    SuspendedIcon,
    MenuIcon,
    CreateIcon,
    RetrieveIcon,
    UpdateIcon,
    DeleteIcon,
    CutIcon,
    CopyIcon,
    PasteIcon,
    CloseIcon,
};
