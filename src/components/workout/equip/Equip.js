import React, { useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../../commons/RowBox';

import { CoreMenu, CreateOption, UpdateOption, DeleteOption } from '../../core/CoreMenu';
import presetAction from '../../core/helpers/presetAction';
import { createRequestFeature, updateRequestFeature, deleteRequestFeature } from '../../core/features/requests';

import EquipForm from './EquipForm';

function Equip( { equips, index, actions, assets, lexicon } ) {

    const equip = equips[ index ];
    const { _uiux } = equip;

    const createMode = presetAction( actions.createMode, { assets, index } );
    const updateMode = presetAction( actions.updateMode, { assets, index } );
    const deleteMode = presetAction( actions.deleteMode, { assets, index } );
    const openForm = presetAction( actions.openForm, { assets, index } );

    // request features

    useEffect( () => {

        if ( _uiux.mode.isCreate ) {
            createRequestFeature( { 
                _item: equip,
                actions,
                assets,
                index,
                url: `/.netlify/functions/workout-equip`
            } );

        } else if ( _uiux.mode.isUpdate ) {
            updateRequestFeature( { 
                _item: equip,
                actions,
                assets,
                index,
                url: `/.netlify/functions/workout-equip?id=${ equip.id }`
            } );

        } else if ( _uiux.mode.isDelete ) {
            deleteRequestFeature( { 
                _item: equip,
                actions,
                assets,
                index,
                url: `/.netlify/functions/workout-equip?id=${ equip.id }`
            } );
        }
    }, [ equip, _uiux, actions, assets, index ] );

    return (
        <RowBox>

            <RowValue title={ `${ equip.diary_id }.${ equip.id }` }>
                <span style={ { fontFamily: 'monospace' } } >{ `${ equip.code } ` }</span>
                <span>{ equip.name }</span>
            </RowValue>

            <RowMenu>
                { ! equip.id 
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
                <EquipForm
                    equips={ equips }
                    index={ index }
                    actions={ actions }
                    assets={ assets }
                    lexicon={ lexicon }
                /> 
            : null }

        </RowBox> 
    );
}

export default Equip;
export { Equip };