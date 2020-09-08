import React from 'react';
import '../../styles/libs/Tools.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faEdit, faTrashAlt, faCut, faCamera, faClone, faTimes } from '@fortawesome/free-solid-svg-icons';

function Tool( { className, icon, title, onClick, refference } ) {
    return (
        <span className={`Tool ${className}`} onClick={onClick} ref={refference}>
            <FontAwesomeIcon icon={icon} className="icon" title={title} />
        </span>
    )
}

const MenuTool = ( { onClick, refference } ) => 
    <Tool 
        className='Menu'
        icon={faEllipsisH} 
        title='Menu'
        onClick={onClick}
        refference={refference}
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

const PasteTool = ( { onClick } ) => 
    <Tool 
        className='Paste'
        icon={faClone} 
        title='Επικόλληση'
        onClick={onClick}
    />

const CloseTool = ( { onClick } ) => 
    <Tool 
        className='Close'
        icon={faTimes} 
        title='Κλείσιμο'
        onClick={onClick}
    />

export { Tool, MenuTool, EditTool, DeleteTool, CutTool, CopyTool, PasteTool, CloseTool };
