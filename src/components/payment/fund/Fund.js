import React, { useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../../libs/RowBox';

import { CoreMenu, CreateOption, UpdateOption, DeleteOption } from '../../core/CoreMenu';
import presetAction from '../../core/helpers/presetAction';
import { createRequestFeature, updateRequestFeature, deleteRequestFeature } from '../../core/features/requests';

import FundForm from './FundForm';

function Fund( { funds, index, actions, assets, lexicon } ) {

    const fund = funds[ index ];
    const { _uiux } = fund;

    const createMode = presetAction( actions.createMode, { assets, index } );
    const updateMode = presetAction( actions.updateMode, { assets, index } );
    const deleteMode = presetAction( actions.deleteMode, { assets, index } );
    const openForm = presetAction( actions.openForm, { assets, index } );

    // request features

    useEffect( () => {

        if ( _uiux.mode.isCreate ) {
            createRequestFeature( { 
                _item: fund,
                actions,
                assets,
                index,
                url: `/.netlify/functions/payment-fund`
            } );

        } else if ( _uiux.mode.isUpdate ) {
            updateRequestFeature( { 
                _item: fund,
                actions,
                assets,
                index,
                url: `/.netlify/functions/payment-fund?id=${ fund.id }`
            } );

        } else if ( _uiux.mode.isDelete ) {
            deleteRequestFeature( { 
                _item: fund,
                actions,
                assets,
                index,
                url: `/.netlify/functions/payment-fund?id=${ fund.id }`
            } );
        }
    }, [ fund, _uiux, actions, assets, index ] );

    return (
        <RowBox>

            <RowValue title={ `${ fund.diary_id }.${ fund.id }` }>
                <span style={ { fontFamily: 'monospace' } } >{ `${ fund.code } ` }</span>
                <span>{ fund.name }</span>
            </RowValue>

            <RowMenu>
                { ! fund.id 
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
                <FundForm 
                    funds={ funds }
                    index={ index }
                    actions={ actions }
                    assets={ assets }
                    lexicon={ lexicon }
            /> 
            : null }

        </RowBox>
    );
}

export default Fund;
export { Fund };