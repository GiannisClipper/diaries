import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Loader } from './Loader';

const Button = styled.button`
    display: inline-block;
    width: calc( 50% - .5em );
    height: 2.5em;
    padding: .5em;

    .icon {
        padding: 0;
        width: 1em;
        height: 1em;
        color: black;
    }

    span:last-child {
        margin-left: .25em;
    }
`;

const StyledOkButton = styled( Button )`
    margin-right: .5em;
    background-color: ${props => props.isDelete 
        ? props.theme.app.button.caution
        : props.theme.app.button.ok
    };
`;

const StyledCancelButton = styled( Button )`
    margin-left: .5em;
    background-color: ${props => props.theme.app.button.cancel};
`;

function OkButton( { label, onClick, isOnRequest, isDelete } ) {

    label = label || 'ΟΚ';

    return (
        <StyledOkButton onClick={onClick} isDelete={isDelete}>
            {isOnRequest
                ? <Loader /> 
                : <FontAwesomeIcon className="icon" icon={ faCheck } />}
            <span>{label}</span>
        </StyledOkButton>
    );
}

function CancelButton( { label, onClick } ) {

    label = label || 'ΑΚΥΡΟ';

    return (
        <StyledCancelButton onClick={onClick}>
            <FontAwesomeIcon className="icon" icon={ faTimes } />
            <span>{label}</span>
        </StyledCancelButton>
    );
}

export { OkButton, CancelButton };