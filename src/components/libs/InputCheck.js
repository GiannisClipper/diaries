import React from 'react';
import styled from 'styled-components';

const StyledInputCheck = styled.span`
    margin-left: .2em;
    margin-right: 1em;

    input[type=checkbox] {
        margin-right: .5em;
    
        /* scale checkboxes */
        -ms-transform: scale(1.25); /* IE */
        -moz-transform: scale(1.25); /* FF */
        -webkit-transform: scale(1.25); /* Safari and Chrome */
        -o-transform: scale(1.25); /* Opera */
        transform: scale(1.25);
    }    
`;

function InputCheck( { label, checked, onChange, readOnly } ) {

    onChange = onChange || ( () => {} );

    return (
        <StyledInputCheck>
            <input
                type="checkbox" 
                checked={checked}
                onChange={onChange}
                readOnly={readOnly}
            />
            <span>
                {label}
            </span>
        </StyledInputCheck>
    )
}

export { InputCheck };