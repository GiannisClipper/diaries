import React, { useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import { CoreMenu, CreateMenuOption, UpdateMenuOption, DeleteMenuOption } from '../core/CoreMenu';
import presetAction from '../core/helpers/presetAction';
import { createRequestFeature, updateRequestFeature, deleteRequestFeature } from '../core/features/requests';

import { LinkBench } from '../app/AppLinks';

import DiaryForm from './DiaryForm';

function Diary( { diaries, index, actions, assets } ) {

    const diary = diaries[ index ];
    const { _uiux } = diary;

    const createMode = presetAction( actions.createMode, { assets, index } );
    const updateMode = presetAction( actions.updateMode, { assets, index } );
    const deleteMode = presetAction( actions.deleteMode, { assets, index } );
    const openForm = presetAction( actions.openForm, { assets, index } );

    // request features

    useEffect( () => {

        if ( _uiux.mode.isCreate ) {
            createRequestFeature( { 
                _item: diary,
                actions,
                assets,
                index,
                url: `/.netlify/functions/diary`
            } );

        } else if ( _uiux.mode.isUpdate ) {
            updateRequestFeature( { 
                _item: diary,
                actions,
                assets,
                index,
                url: `/.netlify/functions/diary?id=${ diary.id }`
            } );

        } else if ( _uiux.mode.isDelete ) {
            deleteRequestFeature( { 
                _item: diary,
                actions,
                assets,
                index,
                url: `/.netlify/functions/diary?id=${ diary.id }`
            } );
        }
    }, [ diary, _uiux, actions, assets, index ] );

    // useEffect( () => console.log( 'Has rendered. ', 'Diary' ) );

    return (
        <RowBox>

            <RowValue title={ `${ diary.user_id }.${ diary.id }` }>

                { ! diary.id || <LinkBench id={ diary.id } /> }

                <span>{ diary.title }</span>
                <span>{ diary.startDate }</span>
            </RowValue>

            <RowMenu>
                { ! diary.id 
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