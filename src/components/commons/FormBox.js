import React from 'react';
import styled from 'styled-components';
import { HeadBox } from './HeadBox';

const Form = styled.div`
    width: 80%;
    padding-top: 0em;
    padding-bottom: 1em;
    overflow: auto;

    ${ props => props.theme.FormBox && props.theme.FormBox };
`;

function FormBox( { headLabel, children } ) {

    headLabel = headLabel || '';

    return (
        <Form onClick={ event => event.stopPropagation() }>
            <HeadBox>
                { headLabel }
            </HeadBox>
            { children }
        </Form> 
    );
}

export { FormBox };

