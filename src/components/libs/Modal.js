import React from 'react';
import '../../styles/libs/Modal.css';

function Modal( { className, children } ) { 

    className = `Modal ${className}`;

    return (
        <div className={className}>
            {children}
        </div> 
    )
}

export { Modal };
