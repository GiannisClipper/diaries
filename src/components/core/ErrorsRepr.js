import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../app/AppContext';

const StyledErrorsRepr = styled.div`
    color: tomato;
    font-weight: 500;
`;

function ErrorRepr( { lexicon, error, key } ) {

    const { type, message } = error;
    const [ entity, field ] = message.split( '.' );

    console.log( type, entity, field, lexicon )

    const result = `${ lexicon[ entity ][ field ] }: ${ lexicon.core[ type ] }`;

    return ( 
        <li key={ key }> 
            { result }
        </li>
    )
}

function ErrorsRepr( { errors } ) {

    const { lexicon } = useContext( AppContext ).state._uiux;

    let key = -1;

    return (
        <StyledErrorsRepr>
            <ul>
                { errors.map( error => 
                    <ErrorRepr lexicon={ lexicon } error={ error } key={ ++key }/> 
                ) }
            </ul>
        </StyledErrorsRepr>
    );
}

export default ErrorsRepr;
export { ErrorsRepr };