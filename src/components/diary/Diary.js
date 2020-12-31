import React, { useContext, useEffect } from 'react';
import { DiariesContext } from './DiariesContext';
import { CRUDContextProvider, CRUDMenu, CreateRequest, UpdateRequest, DeleteRequest } from '../libs/CRUD';
import { parseDiaryToDB } from '../../storage/diary/parsers';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import DiaryForm from './DiaryForm';

function Diary( { index } ) {

    const { state, dispatch } = useContext( DiariesContext );
    const { diaries } = state;
    const diary = diaries[ index ];
    const { _uiux } = diary;

    const payload = { index, _saved: diary };
    const dataToDB = parseDiaryToDB( diary );

    return (
        <CRUDContextProvider 
            dispatch={ dispatch }
            payload={ payload }
        >

            { _uiux.mode.isCreate ?
                <CreateRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/diary` }
                    dataToDB={ dataToDB }
                    body={ JSON.stringify( { data: dataToDB } ) }
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
                    <span>{ diary.title }</span>
                    <span>{ diary.startDate }</span>
                </RowValue>

                <RowMenu>
                    <CRUDMenu
                        options={ ! diary.id ? [ 'C' ] : [ 'U', 'D' ] }
                        process={ _uiux.process }
                    />
                </RowMenu>

                { _uiux.form.isOpen ?
                    <DiaryForm index={index} /> 
                : null }

            </RowBox>

        </CRUDContextProvider>
    );
}

export default Diary;
export { Diary };