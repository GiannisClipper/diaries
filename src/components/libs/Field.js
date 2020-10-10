import React from 'react';
import styled, { css } from 'styled-components';

const Box = styled.div`
    width: 80%;
    display: flex;
    margin: auto;
    margin-top: 1em;
    margin-bottom: 1em;
    text-align: left;
`;

const Label = styled.span`
    vertical-align: top;
    display: inline-block;
    width: 6em;
    padding: .5em;
    background-color: lightskyblue;
`;

const Value = styled.span`
    vertical-align: top;
    display: inline-block;
    width: calc( 100% - 6em );
    min-height: 100%;
    padding: .5em;
    background-color: white;
    input, textarea {
        width: inherit;
    }
`;

function Field( { label, children } ) {
  
    return (
        <Box>
            <Label>
                {label}
            </Label>
            <Value>
                {children}
            </Value>
        </Box>
    );
}

const ButtonsLabel = styled( Label )`
    background-color: transparent;
`;

const ButtonsValue = styled( Value )`
    padding: 0;
    background-color: transparent;
`;

function ButtonsField( { children } ) {
  
    return (
        <Box>
            <ButtonsLabel />
            <ButtonsValue length={children.length}>
                {children}
            </ButtonsValue>
        </Box>
    );
}

export { Field, ButtonsField };
