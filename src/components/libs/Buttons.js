import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Loader } from './Loader';

const Button = styled.button`
    display: inline-block;
    height: 100%;
    width: 100%;
    padding: .5em;

    .icon {
        padding: 0;
        width: 1em;
        height: 1em;
    }

    span:last-child {
        margin-left: .25em;
    }
`;

const StyledOkButton = styled( Button )`
    ${props => props.theme.OkButton && props.theme.OkButton };
    ${props => props.isDelete && props.theme.CautionButton && props.theme.CautionButton };
`;

const StyledCancelButton = styled( Button )`
    ${props => props.theme.CancelButton && props.theme.CancelButton };
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