import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const LoaderBox = styled.span`
    display: inline-block;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% { transform: rotate( 0deg ); }
        100% { transform: rotate( 360deg ); }
    }
`;

function Loader() { 
    return ( 
        <LoaderBox>
            <FontAwesomeIcon icon={ faSyncAlt } className="icon" />
        </LoaderBox> 
    )
}

export { Loader };
