import React from 'react';
import styled from 'styled-components';
import { LoadingIcon, OkIcon, CancelIcon } from './Icons';

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
    ${ props => props.theme.OkButton && props.theme.OkButton };
    ${ props => props.isDelete && props.theme.CautionButton && props.theme.CautionButton };
`;

const StyledCancelButton = styled( Button )`
    ${ props => props.theme.CancelButton && props.theme.CancelButton };
`;

function OkButton( { label, onClick, isRequest, isDelete } ) {

    return (
        <StyledOkButton onClick={ onClick } isDelete={ isDelete }>

            { isRequest && <LoadingIcon /> } 

            { isRequest || <OkIcon /> }

            <span>{ label }</span>

        </StyledOkButton>
    );
}

function CancelButton( { label, onClick } ) {

    return (
        <StyledCancelButton onClick={ onClick }>

            <CancelIcon />

            <span>{ label }</span>

        </StyledCancelButton>
    );
}

export { OkButton, CancelButton };