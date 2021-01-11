import React, { useContext, useEffect } from 'react';
import { FundsContext } from './FundsContext';
import { CreateRequest, UpdateRequest, DeleteRequest } from '../../core/CoreRequests';
import { CoreMenu, CreateMenuOption, UpdateMenuOption, DeleteMenuOption } from '../../core/CoreMenu';
import { RowBox, RowValue, RowMenu } from '../../libs/RowBox';
import FundForm from './FundForm';

function Fund( { index } ) {

    const { state, actions } = useContext( FundsContext );
    const { funds } = state;
    const fund = funds[ index ];
    const { _uiux } = fund;

    const openForm = payload => actions.openForm( { index, ...payload } );

    return (
        <RowBox key={ index }>

            { _uiux.mode.isCreate ?
                <CreateRequest
                    Context={ FundsContext }
                    index={ index }
                    url={ `/.netlify/functions/payment-fund` }
                />

            : _uiux.mode.isUpdate ?
                <UpdateRequest 
                    Context={ FundsContext }
                    index={ index }
                    url={ `/.netlify/functions/payment-fund?id=${fund.id}` }
                />

            : _uiux.mode.isDelete ?
                <DeleteRequest 
                    Context={ FundsContext }
                    index={ index }
                    url={ `/.netlify/functions/payment-fund?id=${fund.id}` }
                />

            : null }

            <RowValue title={ `${fund.diary_id}.${fund.id}` }>
                <span style={ { fontFamily: 'monospace' } } >{ `${fund.code} ` }</span>
                <span>{ fund.name }</span>
            </RowValue>

            <RowMenu>
                { ! fund.id 
                ?
                <CoreMenu process={ _uiux.process } >
                    <CreateMenuOption openForm={ openForm } />
                </CoreMenu>
                :
                <CoreMenu process={ _uiux.process } >
                    <UpdateMenuOption openForm={ openForm } />
                    <DeleteMenuOption openForm={ openForm } />
                </CoreMenu>
                }
            </RowMenu>

            { _uiux.form.isOpen ?
                <FundForm index={ index } /> 
            : null }

        </RowBox>
    );
}

export default Fund;
export { Fund };