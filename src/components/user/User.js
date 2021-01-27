import React from 'react';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import { CreateRequest, UpdateRequest, DeleteRequest } from '../core/CoreRequests';
import { CoreMenu, CreateMenuOption, UpdateMenuOption, DeleteMenuOption } from '../core/CoreMenu';
import presetAction from '../core/helpers/presetAction';

import { UsersContext } from './UsersContext';
import UserForm from './UserForm';

function User( { users, index, actions, assets } ) {

    const user = users[ index ];
    const { _uiux } = user;

    const createMode = presetAction( actions.createMode, { assets, index } );
    const updateMode = presetAction( actions.updateMode, { assets, index } );
    const deleteMode = presetAction( actions.deleteMode, { assets, index } );
    const openForm = presetAction( actions.openForm, { assets, index } );

    return (
        <RowBox>
            { _uiux.mode.isCreate ?
                <CreateRequest 
                    Context={ UsersContext }
                    assets={ assets }
                    index={ index }
                    url={ `/.netlify/functions/user` }
                />

            : _uiux.mode.isUpdate ?
                <UpdateRequest 
                    Context={ UsersContext }
                    assets={ assets }
                    index={ index }
                    url={ `/.netlify/functions/user?id=${ user.id }` }
                />

            : _uiux.mode.isDelete ?
                <DeleteRequest 
                    Context={ UsersContext }
                    assets={ assets }
                    index={ index }
                    url={ `/.netlify/functions/user?id=${ user.id }` }
                />

            : null }

            <RowValue title={ `${ user.id }` }>
                <span>{ user.username }</span>
                <span>{ user.email }</span>
                <span>{ user.remark }</span>
            </RowValue>

            <RowMenu>
                { ! user.id 
                    ?
                    <CoreMenu status={ _uiux.status } >
                        <CreateMenuOption 
                            createMode={ createMode }
                            openForm={ openForm } 
                        />
                    </CoreMenu>
                    :
                    <CoreMenu status={ _uiux.status } >
                        <UpdateMenuOption 
                            updateMode={ updateMode }
                            openForm={ openForm } 
                        />
                        <DeleteMenuOption 
                            deleteMode={ deleteMode }
                            openForm={ openForm } 
                        />
                    </CoreMenu>
                }
            </RowMenu>

            { _uiux.form.isOpen ?
                <UserForm 
                    users={ users }
                    index={ index }
                    actions={ actions }
                    assets={ assets }
        /> 
            : null }

        </RowBox>
    );
}

export default User;
export { User };