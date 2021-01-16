import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { EntriesContext } from './EntriesContext';
import assets from './assets/assets';
import EntriesInit from './EntriesInit';
import Entry from './Entry';

const List = styled.ul`
    display: inline-block;
    vertical-align: top;
    width: 100%;
`;

function Entries( { diary_id } ) {

    const { state, actions } = useContext( EntriesContext );
    const { entries } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'Entries' ) );

    let index = 0;

    return (
        <List>
            <EntriesInit 
                diary_id={ diary_id }
                state={ state }
                actions={ actions }
                assets={ assets }
            />

            { entries.map( entry =>
                <Entry
                    diary_id={ diary_id }
                    state={ state }
                    index={ index++ }
                    actions={ actions }
                    assets={ assets }
                    key={ index }
                />
            ) }
        </List>
    );
}

export default Entries;
export { Entries };
