import React, { useContext, useEffect } from 'react';

import { UsersContext } from './UsersContext';
import { heads } from '../../storage/texts';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import UserInit from './UserInit';
import User from './User';

function Users() {

    const { state } = useContext( UsersContext );
    const { users } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'Users' ) );

    let index = 0;

    return (
        <ListBox>
            <UserInit />

            <BlockBox>
                <BlockLabel>
                    { heads.users }
                </BlockLabel>

                <BlockValue>
                    <ul>
                        { users.map( user => (
                            <User
                                index={ index++ }
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