import React, { useContext, useEffect } from 'react';

import { UsersContext } from './UsersContext';
import { heads } from '../app/assets/texts';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import UsersInit from './UsersInit';
import User from './User';

function Users() {

    const { state } = useContext( UsersContext );
    const { users } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'Users' ) );

    let index = 0;

    return (
        <ListBox>
            <UsersInit />

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