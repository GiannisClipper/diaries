import React, { useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';

import StyledBlock from '../libs/BlockBox';

import { DateRepr } from './DateRepr'; 

import { EntriesContextProvider } from '../entry/EntriesContext';
import { Entries } from '../entry/Entries';

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

const Date1 = ( { diary_id, date, reference } ) => {  // Date1(), to differ from native function Date()

    useEffect( () => console.log( 'Has rendered. ', 'Date1' ) );

    return (
        <BlockBox ref={ reference } isStartDate={ reference }>

            <BlockLabel>
                <DateRepr date={ date.date } />
            </BlockLabel>

            <BlockValue>
                <EntriesContextProvider state={ date }>
                    <Entries
                        diary_id={ diary_id }
                    />
                </EntriesContextProvider>
            </BlockValue>

        </BlockBox>
    )
}

export default Date1;
export { Date1 };