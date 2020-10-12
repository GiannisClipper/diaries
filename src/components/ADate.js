import React, { useEffect } from 'react';
import EntryList from './EntryList';
import DateInfo from './DateInfo';
import styled, { css } from 'styled-components';

const BlockBox = styled.div`
    display: flex;

    width: 100%;
    margin-bottom: .5em;
    text-align: left;

    ${props => props.isTheCentral && css`
        border: 1px dashed black;
    `}
`;

const BlockLabel = styled.span`
    vertical-align: top;
    display: inline-block;
    width: 10em;
    //padding: .5em;
    background-color: lightsteelblue;
    color: lightcoral;
    font-weight: 700;
`;

const BlockValue = styled.span`
    vertical-align: top;
    display: inline-block;
    width: calc( 100% - 10em );
    min-height: 100%;
    //padding: .5em;
    background-color: lightsteelblue;
`;

const ADate = React.memo( ( { aDate, reference } ) => {  // to differ from native function Date()

    const { date, entries } = aDate.data;

    useEffect( () => {
        console.log( 'Has rendered. ', date );
    } );

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