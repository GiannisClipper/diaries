import React from 'react';
import '../../styles/libs/Tools.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faEdit, faFont, faEuroSign, faTrashAlt, faCut, faCamera, faClone, faTimes } from '@fortawesome/free-solid-svg-icons';

function Tool( { className, icon, title, onClick, reference } ) {
    return (
        <span className={`Tool ${className}`} onClick={onClick} ref={reference}>
            <FontAwesomeIcon icon={icon} className="icon" title={title} />
        </span>
    )
}

const MenuTool = ( { onClick, reference } ) => 
    <Tool 
        className='Menu'
        icon={faEllipsisH} 
        title='Menu'
        onClick={onClick}
        reference={reference}
    />

const AddNoteTool = ( { onClick } ) => 
    <Tool 
        className='Edit'
        icon={faFont} 
        title='Νέο σημείωμα'
        onClick={onClick}
    />

const AddPaymentTool = ( { onClick } ) => 
    <Tool 
        className='Edit'
        icon={faEuroSign} 
        title='Νέα πληρωμή'
        onClick={onClick}
    />

const EditTool = ( { onClick } ) => 
    <Tool 
        className='Edit'
        icon={faEdit} 
        title='Επεξεργασία'
        onClick={onClick}
    />

const DeleteTool = ( { onClick } ) => 
    <Tool 
        className='Delete'
        icon={faTrashAlt} 
        title='Διαγραφή'
        onClick={onClick}
    />

const CutTool = ( { onClick } ) => 
    <Tool 
        className='Cut'
        icon={faCut} 
        title='Αποκοπή'
        onClick={onClick}
    />

const CopyTool = ( { onClick } ) => 
    <Tool 
        className='Copy'
        icon={faCamera} 
        title='Αντιγραφή'
        onClick={onClick}
    />

const PasteTool = ( { onClick, disabled } ) => 
    <Tool 
        className='Paste'
        icon={faClone} 
        title='Επικόλληση'
        onClick={onClick}
        disabled={disabled}
    />

const CloseTool = ( { onClick } ) => 
    <Tool 
        className='Close'
        icon={faTimes} 
        title='Κλείσιμο'
        onClick={onClick}
    />

export { Tool, MenuTool, AddNoteTool, AddPaymentTool, EditTool, DeleteTool, CutTool, CopyTool, PasteTool, CloseTool };
