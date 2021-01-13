import React, { useContext } from 'react';
import { UsersContext } from './UsersContext';
import { CreateRequest, UpdateRequest, DeleteRequest } from '../core/CoreRequests';
import { CoreMenu, CreateMenuOption, UpdateMenuOption, DeleteMenuOption } from '../core/CoreMenu';
import { RowBox, RowValue, RowMenu } from '../libs/RowBox';
import UserForm from './UserForm';

function User( { index } ) {

    const { state, actions } = useContext( UsersContext );
    const { users } = state;
    const user = users[ index ];
    const { _uiux } = user;

    const openForm = payload => actions.openForm( { index, ...payload } );

    return (
        <RowBox>
            { _uiux.mode.isCreate ?
                <CreateRequest 
                    Context={ UsersContext }
                    index={ index }
                    url={ `/.netlify/functions/user` }
                />

            : _uiux.mode.isUpdate ?
                <UpdateRequest 
                    Context={ UsersContext }
                    index={ index }
                    url={ `/.netlify/functions/user?id=${user.id}` }
                />

            : _uiux.mode.isDelete ?
                <DeleteRequest 
                    Context={ UsersContext }
                    index={ index }
                    url={ `/.netlify/functions/user?id=${user.id}` }
                />

            : null }

            <RowValue title={ `${user.id}` }>
                <span>{ user.username }</span>
                <span>{ user.email }</span>
                <span>{ user.remark }</span>
            </RowValue>

            <RowMenu>
                { ! user.id 
                ?
                <CoreMenu status={ _uiux.status }>
                    <CreateMenuOption openForm={ openForm } />
                </CoreMenu>
                :
                <CoreMenu status={ _uiux.status }>
                    <UpdateMenuOption openForm={ openForm } />
                    <DeleteMenuOption openForm={ openForm } />
                </CoreMenu>
                }
            </RowMenu>

            { _uiux.form.isOpen ?
                <UserForm index={ index } /> 
            : null }

        </RowBox>
    );
}

export default User;
export { User };