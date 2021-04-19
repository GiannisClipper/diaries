import React, { useContext, useEffect } from 'react';

import { ListBox } from '../commons/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../commons/BlockBox';

import { UsersContext } from './UsersContext';
import assets from './assets/assets'; 
import UsersLoader from './UsersLoader';
import User from './User';

function Users( { lexicon } ) {

    const { state, actions } = useContext( UsersContext );
    const { users } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'Users' ) );

    let index = 0;

    return (
        <ListBox>
            <UsersLoader 
                state={ state }
                actions={ actions }
                assets={ assets }
            />

            <BlockBox>
                <BlockLabel>
                    { lexicon.users.users }
                </BlockLabel>

                <BlockValue>
                    <ul>
                        { users.map( user => (
                            <User
                                users={ users}
                                index={ index++ }
                                actions={ actions }
                                assets={ assets }
                                lexicon={ lexicon }
                                key={ index } 
                            />
                        ) ) }
                    </ul>
                </BlockValue>
            </BlockBox>
        </ListBox>
    );
}

export default Users;
export { Users };