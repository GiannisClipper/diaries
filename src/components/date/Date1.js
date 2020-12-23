import React, { useEffect, useContext } from 'react';

import { PeriodContext } from '../period/PeriodContext'; 
import { DateContextProvider, DateContext } from './DateContext';
import { DateRepr } from './DateRepr'; 
import { Entries } from '../entry/Entry';
import styled, { css } from 'styled-components';
import StyledBlock from '../libs/BlockBox';

const BlockBox = styled( StyledBlock.BlockBox )`
    margin-bottom: .5em;
    text-align: left;

    ${props => props.isTheCentral && css`
        border: 1px dashed black;
    `}
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

    const { date } = useContext( DateContext ).state;

    // useEffect( () => console.log( 'Has rendered. ', date ) );

    return (
        <BlockBox ref={reference} isTheCentral={reference}>

            <BlockLabel>
                <DateRepr date={date} />
            </BlockLabel>

            <BlockValue>
                <Entries />
            </BlockValue>

        </BlockBox>
    )
}

const Dates = ( { dates, centralItem } ) => {

    // useEffect( () => console.log( 'Has rendered. ', 'Dates' ) );

    return (
        <ul>
            { dates.map( date => (
                <DateContextProvider key={ date.date } state={ date }>
                    <Date1
                        reference={ date._uiux.isTheCentral ? centralItem : null }
                    />
                </DateContextProvider>
            ) ) }
        </ul>
    );
}

export { Date1, Dates };