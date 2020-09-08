import React from 'react';
import '../styles/Loader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

function Loader() { 
    return ( 
        <span className="loader">
            <FontAwesomeIcon icon={ faSyncAlt } className="icon" />
        </span> 
    )
}

export { Loader };
