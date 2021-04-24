import React, { useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../commons/RowBox';
import { OptionBox } from '../commons/MenuBox';

import { CoreMenu, CreateOption, UpdateOption, DeleteOption } from '../core/CoreMenu';
import presetAction from '../core/helpers/presetAction';
import { createRequestFeature, updateRequestFeature, deleteRequestFeature } from '../core/features/requests';

import { LinkBench } from '../app/AppLinks';
import { LinkReports } from '../app/AppLinks';
import { LinkBenchSettings } from '../app/AppLinks';
import { urls } from '../app/assets/urls';

import DiaryForm from './DiaryForm';

function Diary( { diaries, index, actions, assets, lexicon } ) {

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
                url: urls.diaries
            } );

        } else if ( _uiux.mode.isUpdate ) {
            updateRequestFeature( { 
                _item: diary,
                actions,
                assets,
                index,
                url: `${ urls.diaries }?id=${ diary.id }`
            } );

        } else if ( _uiux.mode.isDelete ) {
            deleteRequestFeature( { 
                _item: diary,
                actions,
                assets,
                index,
                url: `${ urls.diaries }?id=${ diary.id }`
            } );
        }
    }, [ diary, _uiux, actions, assets, index ] );

    // useEffect( () => console.log( 'Has rendered. ', 'Diary' ) );

    return (
        <RowBox>

            <RowValue title={ `${ diary.user_id }.${ diary.id }` }>
                <div>
                    { diary.startDate
                        ? `${ diary.title } ( ${ diary.startDate } )`
                        : `${ diary.title }`
                    }
                </div>
                { ! diary.id || 
                    <RowMenu>
                        <OptionBox>
                            <LinkBench title={ lexicon.bench.bench } id={ diary.id } />
                        </OptionBox>
                        <OptionBox>
                            <LinkReports title={ lexicon.reports.reports } id={ diary.id } />
                        </OptionBox>
                        <OptionBox>
                            <LinkBenchSettings title={ lexicon.bench.settings } id={ diary.id } />
                        </OptionBox>
                    </RowMenu>
                }
            </RowValue>

            <RowMenu>
                { ! diary.id 
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
                <DiaryForm
                    diaries={ diaries }
                    index={ index }
                    actions={ actions }
                    assets={ assets }
                    lexicon={ lexicon }
                /> 
            : null }

        </RowBox>
    );
}

export default Diary;
export { Diary };