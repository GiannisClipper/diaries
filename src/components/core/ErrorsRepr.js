import React from 'react';
import styled from 'styled-components';

const StyledErrorsRepr = styled.div`
    font-size: 0.85em;
    font-weight: 500;

    ${ props => props.theme.ErrorsRepr && props.theme.ErrorsRepr };
`;

function ErrorsRepr( { errors } ) {

    let key = -1;

    return (
        <StyledErrorsRepr>
            <ul>
                { errors.map( error => 
                    <li key={ key }>{ error }</li>
                ) }
            </ul>
        </StyledErrorsRepr>
    );
}

export default ErrorsRepr;
export { ErrorsRepr };
