import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

import StyledBlock from '../commons/BlockBox';

import { DateRepr } from './DateRepr'; 

import { EntriesContextProvider } from '../entries/EntriesContext';
import { Entries } from '../entries/Entries';

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

const Date1 = ( { diary_id, date, reference, lexicon } ) => {  // Date1(), to differ from native function Date()

    // useEffect( () => console.log( 'Has rendered. ', 'Date1' ) );

    return (
        <BlockBox ref={ reference } isStartDate={ reference }>

            <BlockLabel>
                <DateRepr date={ date.date } />
            </BlockLabel>

            <BlockValue>
                { diary_id ?
                    <EntriesContextProvider state={ date }>
                        <Entries
                            diary_id={ diary_id }
                            lexicon={ lexicon }
                        />
                    </EntriesContextProvider>
                :
                    null
                }
            </BlockValue>

        </BlockBox>
    )
}

export default Date1;
export { Date1 };