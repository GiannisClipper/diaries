import React, { useContext, useEffect } from 'react';
import { UsersContext } from './UsersContext';
import { CRUDContextProvider, CRUDMenu, CreateRequest, UpdateRequest, DeleteRequest } from '../libs/CRUD';
import { parseUserToDB } from '../../storage/user/parsers';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import UserForm from './UserForm';

function User( { index } ) {

    const { state, dispatch } = useContext( UsersContext );
    const { users } = state;
    const user = users[ index ];
    const { _uiux } = user;

    const payload = { index, _saved: user };
    const dataToDB = parseUserToDB( user );

    return (
        <CRUDContextProvider 
            dispatch={ dispatch }
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
                    body={ JSON.stringify( { data: dataToDB } ) }
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

export default User;
export { User };