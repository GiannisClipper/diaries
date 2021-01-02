import React, { useEffect, useContext } from 'react';

import { DatesContext } from './DatesContext';
import { DateContextProvider, DateContext } from './DateContext';
import { DateRepr } from './DateRepr'; 
import { Entries } from '../entry/Entry';
import styled, { css } from 'styled-components';
import StyledBlock from '../libs/BlockBox';

const BlockBox = styled( StyledBlock.BlockBox )`
    margin-bottom: .5em;
    text-align: left;

    ${ props => props.isStartDate && css`
        border: 1px dashed black;
    ` }
`;

const BlockLabel = styled( StyledBlock.BlockLabel )`
    width: 10em;
    padding: 0;
`;

const BlockValue = styled( StyledBlock.BlockValue )`
    width: calc( 100% - 10em );
    padding: 0;
`;

const Date1 = ( { reference } ) => {  // Date1(), to differ from native function Date()

    const { state } = useContext( DateContext ); 
    const { date } = state;

    useEffect( () => console.log( 'Has rendered. ', 'Date1' ) );

    return (
        <BlockBox ref={ reference } isStartDate={ reference }>

            <BlockLabel>
                <DateRepr date={ date } />
            </BlockLabel>

            <BlockValue>
                <Entries />
            </BlockValue>

        </BlockBox>
    )
}

const Dates = ( { startDate } ) => {

    const { state } = useContext( DatesContext ); 
    const { dates } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'Dates', dates ) );

    return (
        <ul>
            { dates.map( date => (
                <DateContextProvider key={ date.date } state={ date }>
                    <Date1
                        reference={ date._uiux.isStartDate ? startDate : null }
                    />
                </DateContextProvider>
            ) ) }
        </ul>
    );
}

export { Date1, Dates };