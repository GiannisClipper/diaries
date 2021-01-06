import React, { useContext, useEffect } from 'react';

import { CoreContextProvider } from '../core/CoreContext';
import actions from '../../storage/core/actions';
import { diarySchema } from '../../storage/schemas';
import { parseDiaryFromDB } from '../../storage/diary/parsers';
import { CreateRequest, UpdateRequest, DeleteRequest } from '../core/CoreRequests';
import { CoreMenu, CreateMenuOption, UpdateMenuOption, DeleteMenuOption } from '../core/CoreMenu';

import { AppContext } from '../app/AppContext';
import { DiariesContext } from './DiariesContext';
import { parseDiaryToDB } from '../../storage/diary/parsers';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import { LinkBench } from '../app/AppLinks';

import DiaryForm from './DiaryForm';

function Diary( { index } ) {

    const { user_id } = useContext( AppContext ).state.signin;

    const { state, dispatch } = useContext( DiariesContext );
    const { diaries } = state;
    const diary = diaries[ index ];
    const { _uiux } = diary;

    const payload = { 
        _namespace: 'diaries',
        index, 
        _saved: diary,
        _schema: diarySchema,
        _parseFromDB: parseDiaryFromDB,
        _sort: null,
    };

    const dataToDB = parseDiaryToDB( diary );

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
                    url={ `/.netlify/functions/diary` }
                    dataToDB={ { ...dataToDB, user_id } }
                    body={ JSON.stringify( { data: { ...dataToDB, user_id } } ) }
                />

            : _uiux.mode.isUpdate ?
                <UpdateRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/diary?id=${diary.id}` }
                    dataToDB={ dataToDB }
                    body={ JSON.stringify( { data: dataToDB } ) }
                    id={ diary.id }
                />

            : _uiux.mode.isDelete ?
                <DeleteRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/diary?id=${diary.id}` }
                    dataToDB={ dataToDB }
                    body={ JSON.stringify( { data: dataToDB } ) }
                    id={ diary.id }
                />

            : null }

            <RowBox>
                <RowValue title={ `${diary.id}` }>
                    { ! diary.id || <LinkBench diary_id={ diary.id } /> }
                    <span>{ diary.title }</span>
                    <span>{ diary.startDate }</span>
                </RowValue>

                <RowMenu>
                    { ! diary.id 
                    ?
                    <CoreMenu process={ _uiux.process } >
                        <CreateMenuOption />
                    </CoreMenu>
                    :
                    <CoreMenu process={ _uiux.process } >
                        <UpdateMenuOption />
                        <DeleteMenuOption />
                    </CoreMenu>
                    }
                </RowMenu>
            </RowBox>

            { _uiux.form.isOpen ?
                <DiaryForm index={index} /> 
            : null }

        </CoreContextProvider>
    );
}

export default Diary;
export { Diary };