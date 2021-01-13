import React, { useContext, useEffect } from 'react';
import { DiariesContext } from './DiariesContext';
import { CreateRequest, UpdateRequest, DeleteRequest } from '../core/CoreRequests';
import { CoreMenu, CreateMenuOption, UpdateMenuOption, DeleteMenuOption } from '../core/CoreMenu';
import { RowBox, RowValue, RowMenu } from '../libs/RowBox';
import { LinkBench } from '../app/AppLinks';
import DiaryForm from './DiaryForm';

function Diary( { index } ) {

    const { state, actions } = useContext( DiariesContext );
    const { diaries } = state;
    const diary = diaries[ index ];
    const { _uiux } = diary;

    const openForm = payload => actions.openForm( { index, ...payload } );

    return (
            <RowBox>
                { _uiux.mode.isCreate ?
                    <CreateRequest 
                        Context={ DiariesContext }
                        index={ index }
                        url={ `/.netlify/functions/diary` }
                    />

                : _uiux.mode.isUpdate ?
                    <UpdateRequest 
                        Context={ DiariesContext }
                        index={ index }
                        url={ `/.netlify/functions/diary?id=${diary.id}` }
                    />

                : _uiux.mode.isDelete ?
                    <DeleteRequest 
                        Context={ DiariesContext }
                        index={ index }
                        url={ `/.netlify/functions/diary?id=${diary.id}` }
                    />

                : null }

                <RowValue title={ `${diary.user_id}.${diary.id}` }>

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
                    <DiaryForm index={ index } /> 
                : null }

            </RowBox>
    );
}

export default Diary;
export { Diary };