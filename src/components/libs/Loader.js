import React from 'react';
import '../../styles/libs/Loader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

function Loader() { 
    return ( 
        <span className="Loader">
            <FontAwesomeIcon icon={ faSyncAlt } className="icon" />
        </span> 
    )
}

export { Loader };
