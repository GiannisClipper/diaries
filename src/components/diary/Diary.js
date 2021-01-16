import React, { useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';
import { LinkBench } from '../app/AppLinks';

import { CreateRequest, UpdateRequest, DeleteRequest } from '../core/CoreRequests';
import { CoreMenu, CreateMenuOption, UpdateMenuOption, DeleteMenuOption } from '../core/CoreMenu';
import equipAction from '../core/helpers/equipAction';

import { DiariesContext } from './DiariesContext';
import DiaryForm from './DiaryForm';

function Diary( { diaries, index, actions, assets } ) {

    const diary = diaries[ index ];
    const { _uiux } = diary;

    const openForm = equipAction( actions.openForm, { assets, index } );

    return (
            <RowBox>
                { _uiux.mode.isCreate ?
                    <CreateRequest 
                        Context={ DiariesContext }
                        assets={ assets }
                        index={ index }
                        url={ `/.netlify/functions/diary` }
                    />

                : _uiux.mode.isUpdate ?
                    <UpdateRequest 
                        Context={ DiariesContext }
                        assets={ assets }
                        index={ index }
                        url={ `/.netlify/functions/diary?id=${ diary.id }` }
                    />

                : _uiux.mode.isDelete ?
                    <DeleteRequest 
                        Context={ DiariesContext }
                        assets={ assets }
                        index={ index }
                        url={ `/.netlify/functions/diary?id=${ diary.id }` }
                    />

                : null }

                <RowValue title={ `${ diary.user_id }.${ diary.id }` }>

                    { ! diary.id || <LinkBench id={ diary.id } /> }

                    <span>{ diary.title }</span>
                    <span>{ diary.startDate }</span>
                </RowValue>

                <RowMenu>
                    { ! diary.id 
                    ?
                    <CoreMenu status={ _uiux.status } >
                        <CreateMenuOption openForm={ openForm } />
                    </CoreMenu>
                    :
                    <CoreMenu status={ _uiux.status } >
                        <UpdateMenuOption openForm={ openForm } />
                        <DeleteMenuOption openForm={ openForm } />
                    </CoreMenu>
                    }
                </RowMenu>

                { _uiux.form.isOpen ?
                    <DiaryForm
                        diaries={ diaries }
                        index={ index }
                        actions={ actions }
                        assets={ assets }
                    /> 
                : null }

            </RowBox>
    );
}

export default Diary;
export { Diary };