import React from 'react';
import styled, { css } from 'styled-components';

const centeredness = css`
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba( 0, 0, 0, 0.5 );

    ${props => props.centeredness && centeredness}
    ${props => props.theme.Modal && props.theme.Modal };
`;

function Modal( { onClick, centeredness, children } ) { 

    onClick = onClick || null;

    return (
        <StyledModal onClick={onClick} centeredness={centeredness}>
            {children}
        </StyledModal> 
    )
}

export { Modal };
