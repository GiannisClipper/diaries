import React, { useContext, useEffect } from 'react';
import { EntriesContext } from '../entry/EntriesContext';
import styled from 'styled-components';
import Entry from './Entry';

const List = styled.ul`
    display: inline-block;
    vertical-align: top;
    width: 100%;
`;

function Entries() {

    const { state } = useContext( EntriesContext );
    const { entries } = state;

    //useEffect( () => console.log( 'Has rendered. ', 'Entries' ) );

    let index = 0;

    return (
        <List>
            { entries.map( entry =>
                <Entry
                    index={ index++ }
                    key={ index }
                />
            ) }
        </List>
    );
}

export default Entries;
export { Entries };
