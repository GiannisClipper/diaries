import React, { useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../commons/RowBox';

import { CoreMenu, CreateOption, UpdateOption, DeleteOption } from '../core/CoreMenu';
import presetAction from '../core/helpers/presetAction';
import { createRequestFeature, updateRequestFeature, deleteRequestFeature } from '../core/features/requests';

import { urls } from '../app/assets/urls';

import UserForm from './UserForm';

function User( { users, index, actions, assets, lexicon } ) {

    const user = users[ index ];
    const { _uiux } = user;

    const createMode = presetAction( actions.createMode, { assets, index } );
    const updateMode = presetAction( actions.updateMode, { assets, index } );
    const deleteMode = presetAction( actions.deleteMode, { assets, index } );
    const openForm = presetAction( actions.openForm, { assets, index } );

    // request features

    useEffect( () => {

        if ( _uiux.mode.isCreate ) {
            createRequestFeature( { 
                _item: user,
                actions,
                assets,
                index,
                url: urls.users
            } );

        } else if ( _uiux.mode.isUpdate ) {
            updateRequestFeature( { 
                _item: user,
                actions,
                assets,
                index,
                url: `${ urls.users }?id=${ user.id }`
            } );

        } else if ( _uiux.mode.isDelete ) {
            deleteRequestFeature( { 
                _item: user,
                actions,
                assets,
                index,
                url: `${ urls.users }?id=${ user.id }`
            } );
        }
    }, [ user, _uiux, actions, assets, index ] );

    return (
        <RowBox>

            <RowValue title={ `${ user.id }` }>
                { user.email
                    ? `${ user.username } ( ${ user.email } )`
                    : `${ user.username }`
                }
            </RowValue>

            <RowMenu>
                { ! user.id 
                    ?
                    <CoreMenu status={ _uiux.status } >
                        <CreateOption 
                            lexicon={ lexicon }
                            onClick={ () => { 
                                createMode(); 
                                openForm(); 
                            } }
                        />
                    </CoreMenu>
                    :
                    <CoreMenu status={ _uiux.status } >
                        <UpdateOption 
                            lexicon={ lexicon }
                            onClick={ () => { 
                                updateMode(); 
                                openForm(); 
                            } }
                        />
                        <DeleteOption 
                            lexicon={ lexicon }
                            onClick={ () => { 
                                deleteMode(); 
                                openForm(); 
                            } }
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
                    lexicon={ lexicon }
                /> 
            : null }

        </RowBox>
    );
}

export default User;
export { User };