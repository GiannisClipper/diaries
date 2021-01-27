import React, { useContext, useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../../libs/RowBox';

import { CreateRequest, UpdateRequest, DeleteRequest } from '../../core/CoreRequests';
import { CoreMenu, CreateMenuOption, UpdateMenuOption, DeleteMenuOption } from '../../core/CoreMenu';
import presetAction from '../../core/helpers/presetAction';

import { GenresContext } from './GenresContext';
import GenreForm from './GenreForm';

function Genre( { genres, index, actions, assets } ) {

    const genre = genres[ index ];
    const { _uiux } = genre;

    const createMode = presetAction( actions.createMode, { assets, index } );
    const updateMode = presetAction( actions.updateMode, { assets, index } );
    const deleteMode = presetAction( actions.deleteMode, { assets, index } );
    const openForm = presetAction( actions.openForm, { assets, index } );

    const typeInfo = _uiux.mode.isCreate
        ? ''
        : genre.isIncoming && genre.isOutgoing
        ? 'Μ'
        : genre.isIncoming
        ? 'Ε'
        : genre.isOutgoing
        ? 'Π'
        : '-';

    return (
        <RowBox>

            { _uiux.mode.isCreate ?
                <CreateRequest
                    Context={ GenresContext }
                    assets={ assets }
                    index={ index }
                    url={ `/.netlify/functions/payment-genre` }
                />

            : _uiux.mode.isUpdate ?
                <UpdateRequest 
                    Context={ GenresContext }
                    assets={ assets }
                    index={ index }
                    url={ `/.netlify/functions/payment-genre?id=${genre.id}` }
                />

            : _uiux.mode.isDelete ?
                <DeleteRequest 
                    Context={ GenresContext }
                    assets={ assets }
                    index={ index }
                    url={ `/.netlify/functions/payment-genre?id=${genre.id}` }
                />

            : null }

            <RowValue title={ `${ genre.diary_id }.${ genre.id }` }>
                <span style={ { fontFamily: 'monospace' } } >{ `${ typeInfo } ${ genre.code } ` }</span>
                <span>{ genre.name }</span>
            </RowValue>

            <RowMenu>
                { ! genre.id 
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
                <GenreForm
                    genres={ genres }
                    index={ index }
                    actions={ actions }
                    assets={ assets }
                /> 
            : null }

        </RowBox> 
    );
}

export default Genre;
export { Genre };