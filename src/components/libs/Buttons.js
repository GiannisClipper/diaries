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
        width: 1.2em;
        height: 1.2em;
    }

    span:last-child {
        margin-left: .5em;
    }
`;

const StyledOkButton = styled( Button )`
    ${props => props.theme.OkButton && props.theme.OkButton };
    ${props => props.isDelete && props.theme.CautionButton && props.theme.CautionButton };
`;

const StyledCancelButton = styled( Button )`
    ${props => props.theme.CancelButton && props.theme.CancelButton };
`;

function OkButton( { icon, label, onClick, isOnRequest, isDelete } ) {

    icon = icon || faCheck;

    label = label || 'ΟΚ';

    return (
        <StyledOkButton onClick={onClick} isDelete={isDelete}>
            {isOnRequest
                ? <Loader /> 
                : <FontAwesomeIcon className="icon" icon={icon} />}
            <span>{label}</span>
        </StyledOkButton>
    );
}

function CancelButton( { icon, label, onClick } ) {

    icon = icon || faTimes;

    label = label || 'ΑΚΥΡΟ';

    return (
        <StyledCancelButton onClick={onClick}>
            <FontAwesomeIcon className="icon" icon={icon} />
            <span>{label}</span>
        </StyledCancelButton>
    );
}

export { OkButton, CancelButton };