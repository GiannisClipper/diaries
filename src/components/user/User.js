import React, { useContext, useEffect } from 'react';

import { CoreContextProvider } from '../core/CoreContext';
import actions from '../../storage/core/actions';
import { userSchema } from '../../storage/schemas';
import { parseUserFromDB } from '../../storage/user/parsers';
import { CreateRequest, UpdateRequest, DeleteRequest } from '../core/CoreRequests';
import CoreMenu from '../core/CoreMenu';

import { UsersContext } from './UsersContext';
import { parseUserToDB } from '../../storage/user/parsers';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import UserForm from './UserForm';

function User( { index } ) {

    const { state, dispatch } = useContext( UsersContext );
    const { users } = state;
    const user = users[ index ];
    const { _uiux } = user;

    const payload = { 
        _namespace: 'users',
        index,
        _saved: user,
        _schema: userSchema,
        _parseFromDB: parseUserFromDB,
        _sort: ( x, y ) => x.username > y.username ? 1 : -1,
    };

    const dataToDB = parseUserToDB( user );

    return (
        <CoreContextProvider 
            actions={ [ 
                actions.form, 
                actions.validation, 
                actions.createOne, 
                actions.updateOne, 
                actions.deleteOne 
            ] }
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
                    <CoreMenu
                        options={ ! user.id ? [ 'C' ] : [ 'U', 'D' ] }
                        process={ _uiux.process }
                    />
                </RowMenu>

                { _uiux.form.isOpen ?
                    <UserForm index={index} /> 
                : null }

            </RowBox>

        </CoreContextProvider>
    );
}

export default User;
export { User };