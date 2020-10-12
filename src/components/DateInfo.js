import React from 'react';
import { dayNames, monthNames } from '../helpers/dates';
import styled from 'styled-components';

const StyledDateInfo = styled.div`
    width: 10em;
    display: inline-block;
    vertical-align: top;
    margin-bottom: .5em;
    color: lightcoral;
    font-weight: 700;
    text-align: left;
    span {
        display: inline-block;
    }
`;

const MonthAndYear = styled.span`
    font-size: .65em;
    padding-top: 1.3em;
    padding-left: .5em;
    writing-mode: vertical-rl;
`;

const DateNumber = styled.span`
    font-size: 1.5em;
    padding-left: .1em;
    padding-right: .1em;
    vertical-align: top;
`;

const DayName = styled.span`
    font-size: 1em;
    padding-top: .5em;
    vertical-align: top;
`;
    
function DateInfo( { date } ) {
    const dayName = dayNames[ date.getDay() ];
    const dateNum = date.getDate().toString().padStart( 2, '0' );
    const monthName = monthNames[ date.getMonth() ];
    const yearNum = date.getFullYear();

    return (
        <StyledDateInfo>
            <MonthAndYear>
                { `${yearNum} ${monthName}` }
            </MonthAndYear>

            <DateNumber>
                { `${dateNum}` }
            </DateNumber>

            <DayName>
                { `${dayName}` }
            </DayName>
        </StyledDateInfo>
    );
}

export default DateInfo;