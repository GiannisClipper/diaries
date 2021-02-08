import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { EntriesContext } from './EntriesContext';
import assets from './assets/assets';
import EntriesLoader from './EntriesLoader';
import Entry from './Entry';

const List = styled.ul`
    display: inline-block;
    vertical-align: top;
    width: 100%;
`;

function Entries( { diary_id, lexicon } ) {

    const { state, actions } = useContext( EntriesContext );
    const { date, entries } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'Entries' ) );

    let index = 0;

    return (
        <List>
            <EntriesLoader 
                diary_id={ diary_id }
                state={ state }
                actions={ actions }
                assets={ assets }
            />

            { entries.map( entry =>
                <Entry
                    diary_id={ diary_id }
                    date={ date }
                    entries={ entries }
                    index={ index++ }
                    actions={ actions }
                    assets={ assets }
                    lexicon={ lexicon }
                    key={ index }
                />
            ) }
        </List>
    );
}

export default Entries;
export { Entries };
