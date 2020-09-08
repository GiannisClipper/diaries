import React from 'react';
import '../../styles/libs/Modal.css';

function Modal( props ) { 
    return (
        <div className="Modal">
            {props.children}
        </div> 
    )
}

export { Modal };
