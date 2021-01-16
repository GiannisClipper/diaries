import React, { useContext, useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../../libs/RowBox';

import { CreateRequest, UpdateRequest, DeleteRequest } from '../../core/CoreRequests';
import { CoreMenu, CreateMenuOption, UpdateMenuOption, DeleteMenuOption } from '../../core/CoreMenu';
import prepayAction from '../../core/helpers/prepayAction';

import { FundsContext } from './FundsContext';
import FundForm from './FundForm';

function Fund( { funds, index, actions, assets } ) {

    const fund = funds[ index ];
    const { _uiux } = fund;

    const openForm = prepayAction( actions.openForm, { assets, index } );

    return (
        <RowBox>

            { _uiux.mode.isCreate ?
                <CreateRequest
                    Context={ FundsContext }
                    assets={ assets }
                    index={ index }
                    url={ `/.netlify/functions/payment-fund` }
                />

            : _uiux.mode.isUpdate ?
                <UpdateRequest 
                    Context={ FundsContext }
                    assets={ assets }
                    index={ index }
                    url={ `/.netlify/functions/payment-fund?id=${ fund.id }` }
                />

            : _uiux.mode.isDelete ?
                <DeleteRequest 
                    Context={ FundsContext }
                    assets={ assets }
                    index={ index }
                    url={ `/.netlify/functions/payment-fund?id=${ fund.id }` }
                />

            : null }

            <RowValue title={ `${ fund.diary_id }.${ fund.id }` }>
                <span style={ { fontFamily: 'monospace' } } >{ `${ fund.code } ` }</span>
                <span>{ fund.name }</span>
            </RowValue>

            <RowMenu>
                { ! fund.id 
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
                <FundForm 
                    funds={ funds }
                    index={ index }
                    actions={ actions }
                    assets={ assets }
            /> 
            : null }

        </RowBox>
    );
}

export default Fund;
export { Fund };