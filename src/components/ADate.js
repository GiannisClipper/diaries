import React, { useEffect } from 'react';
import EntryList from './EntryList';
import DateInfo from './DateInfo';
import styled, { css } from 'styled-components';
import StyledBlock from './libs/BlockBox';

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

const ADate = React.memo( ( { aDate, reference } ) => {  // Adate(), to differ from native function Date()

    const { date, entries } = aDate.data;

    // useEffect( () => {
    //     console.log( 'Has rendered. ', date );
    // } );

    return (
        <BlockBox ref={reference} isTheCentral={reference}>
            <BlockLabel>
                <DateInfo date={date} />
            </BlockLabel>
            <BlockValue>
                <EntryList date={date} entries={entries} />
            </BlockValue>
        </BlockBox>
    )
} );

export default ADate;