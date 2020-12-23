import React, { useContext, useEffect } from 'react';

import { AppContext } from '../app/AppContext';
import { parseUserToDB } from '../../storage/user/parsers';
import { heads } from '../../storage/texts';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';
import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import { CRUDContextProvider, CRUDMenu, CreateRequest, UpdateRequest, DeleteRequest } from '../libs/CRUD';
import { UserInit } from './UserInit';
import UserForm from './UserForm';

function User( { index } ) {

    const { state, dispatch } = useContext( AppContext );
    const { users } = state;
    const user = users[ index ];
    const { _uiux } = user;

    const payload = { index, _saved: user };
    const dataToDB = parseUserToDB( user );

    return (
        <CRUDContextProvider 
            dispatch={ dispatch }
            namespace={ 'user' }
            payload={ payload }
        >

            { _uiux.mode.isCreate ?
                <CreateRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/user` }
                    dataToDB={ dataToDB }
                    body={ JSON.stringify( { data: dataToDB } ) }
                />

            : _uiux.mode.isUpdate ?
                <UpdateRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/user?id=${user.id}` }
                    dataToDB={ dataToDB }
                    body={JSON.stringify( { data: dataToDB } ) }
                    id={ user.id }
                />

            : _uiux.mode.isDelete ?
                <DeleteRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/user?id=${user.id}` }
                    dataToDB={ dataToDB }
                    body={ JSON.stringify( { data: dataToDB } ) }
                    id={ user.id }
                />

            : null }

            <RowBox>
                <RowValue title={ `${user.id}` }>
                    <span>{ user.username }</span>
                    <span>{ user.email }</span>
                    <span>{ user.remark }</span>
                </RowValue>

                <RowMenu>
                    <CRUDMenu
                        options={ ! user.id ? [ 'C' ] : [ 'U', 'D' ] }
                        process={ _uiux.process }
                    />
                </RowMenu>

                { _uiux.form.isOpen ?
                    <UserForm index={index} /> 
                : null }

            </RowBox>

        </CRUDContextProvider>
    );
}

function Users() {

    const { state } = useContext( AppContext );
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

export { User, Users };