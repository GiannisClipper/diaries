import React, { useContext, useEffect } from 'react';
import { STATEContext } from './STATEContext';
import { heads } from '../storage/texts';

import { ListBox } from './libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from './libs/BlockBox';
import { RowBox, RowValue, RowMenu } from './libs/RowBox';

import { CRUDContextProvider, CRUDMenu, RetrieveManyRequest, CreateRequest, UpdateRequest, DeleteRequest } from './libs/CRUD';
import UserForm from './UserForm';
import { parseUserToDB } from '../storage/parsers';

const namespace = 'users';

function UserList() {

    const STATE = useContext( STATEContext );
    const { users } = STATE.state.data;

    useEffect( () => {
        console.log( 'Has rendered. ', 'UserList' );
    } );

    let index = -1;

    return (
        <ListBox>
            <UserInit />
            <BlockBox>
                <BlockLabel>
                    {heads.users}
                </BlockLabel>
                <BlockValue>
                    <ul>
                        { users.map( user => (
                            <User key={++index} index={index} users={users} />
                        ) ) }
                    </ul>
                </BlockValue>
            </BlockBox>
        </ListBox>
    );
}

function UserInit() {

    const STATE = useContext( STATEContext )
    const { dispatch } = STATE;
    const { init } = STATE.state.uiux;

    return (
        <CRUDContextProvider 
            dispatch={dispatch} 
            namespace={namespace} 
        >
            <RetrieveManyRequest 
                process={init.users.process}
                url={`/.netlify/functions/user`}
            />
        </CRUDContextProvider>
    );
}

function User( { index, users } ) {

    const user = users[ index ];

    const STATE = useContext( STATEContext )
    const { dispatch } = STATE;
    const payload = { index, _saved: user.data };
    const dataToDB = parseUserToDB( user.data );

    return (
        <CRUDContextProvider 
            dispatch={dispatch} 
            namespace={namespace} 
            payload={payload}
        >
            { user.uiux.mode.isCreate ?
                <CreateRequest 
                    process={user.uiux.process}
                    url={`/.netlify/functions/user`}
                    dataToDB={dataToDB}
                    body={JSON.stringify( { data: dataToDB } )}
                />
            : user.uiux.mode.isUpdate ?
                <UpdateRequest 
                    process={user.uiux.process}
                    url={`/.netlify/functions/user?id=${user.data.id}`}
                    dataToDB={dataToDB}
                    body={JSON.stringify( { data: dataToDB } )}
                />
            : user.uiux.mode.isDelete ?
                <DeleteRequest 
                    process={user.uiux.process}
                    url={`/.netlify/functions/user?id=${user.data.id}`}
                    dataToDB={dataToDB}
                    body={JSON.stringify( { data: dataToDB } )}
                />
            : null }

            <RowBox key={index}>
                <RowValue title={`${user.data.id}`}>
                    <span>{user.data.username}</span>
                    <span>{user.data.email}</span>
                    <span>{user.data.remark}</span>
                </RowValue>

                <RowMenu>
                    <CRUDMenu
                        options={!user.data.id ? [ 'C' ] : [ 'U', 'D' ]}
                        process={user.uiux.process}
                        status={user.uiux.status}
                    />
                </RowMenu>

                { user.uiux.form.isOpen ?
                    <UserForm
                        users={users} 
                        index={index} 
                    /> 
                : null }
            </RowBox>
        </CRUDContextProvider>
    );
}

export default UserList;