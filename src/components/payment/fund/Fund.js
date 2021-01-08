import React, { useContext, useEffect } from 'react';

import { CoreContextProvider } from '../../core/CoreContext';
import actions from '../../../storage/core/actions';
import { paymentFundSchema } from '../../../storage/schemas';
import { parseFundFromDB } from '../../../storage/payment/fund/parsers';
import { CreateRequest, UpdateRequest, DeleteRequest } from '../../core/CoreRequests';
import { CoreMenu, CreateMenuOption, UpdateMenuOption, DeleteMenuOption } from '../../core/CoreMenu';

import { BenchContext } from '../../bench/BenchContext';
import { FundsContext } from './FundsContext';
import { parseFundToDB } from '../../../storage/payment/fund/parsers';

import { RowBox, RowValue, RowMenu } from '../../libs/RowBox';

import FundForm from './FundForm';

function Fund( { index } ) {

    const { diary_id } = useContext( BenchContext ).state;

    const { state, dispatch } = useContext( FundsContext );
    const { funds } = state;
    const fund = funds[ index ];
    const { _uiux } = fund;

    const payload = { 
        _namespace: 'funds',
        index, 
        _saved: fund,
        _schema: paymentFundSchema,
        _parseFromDB: parseFundFromDB,
        _sort: null,
 };
    const dataToDB = parseFundToDB( fund );

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
                    process={_uiux.process}
                    url={ `/.netlify/functions/payment-fund` }
                    body={ JSON.stringify( { data: { ...dataToDB, diary_id } } ) }
                    dataToDB={ { ...dataToDB, diary_id } }
                    error={ _uiux.error }
                />

            : _uiux.mode.isUpdate ?
                <UpdateRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/payment-fund?id=${fund.id}` }
                    body={ JSON.stringify( { data: dataToDB } ) }
                    dataToDB={ dataToDB }
                    id={ fund.id }
                    error={ _uiux.error }
                />

            : _uiux.mode.isDelete ?
                <DeleteRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/payment-fund?id=${fund.id}` }
                    body={ JSON.stringify( { data: dataToDB } ) }
                    dataToDB={ dataToDB }
                    id={ fund.id }
                    error={ _uiux.error }
                />

            : null }
            
            <RowBox key={ index }>
                <RowValue title={ `${fund.id}` }>
                    <span style={ { fontFamily: 'monospace' } } >{ `${fund.code} ` }</span>
                    <span>{ fund.name }</span>
                </RowValue>

                <RowMenu>
                    { ! fund.id 
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
                <FundForm 
                    index={ index } 
                /> 
            : null }

        </CoreContextProvider>
    );
}

export default Fund;
export { Fund };