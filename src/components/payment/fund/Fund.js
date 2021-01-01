import React, { useContext, useEffect } from 'react';
import { FundsContext } from './FundsContext';
import { CRUDContextProvider, CRUDMenu, CreateRequest, UpdateRequest, DeleteRequest } from '../../libs/CRUD';
import { parseFundToDB } from '../../../storage/payment/fund/parsers';

import { RowBox, RowValue, RowMenu } from '../../libs/RowBox';

import FundForm from './FundForm';

function Fund( { index } ) {

    const { state, dispatch } = useContext( FundsContext );
    const { funds } = state;
    const fund = funds[ index ];
    const { _uiux } = fund;

    const payload = { index, _saved: fund };
    const dataToDB = parseFundToDB( fund );

    return (
        <CRUDContextProvider 
            dispatch={ dispatch } 
            payload={ payload }
        >

            { _uiux.mode.isCreate ?
                <CreateRequest
                    process={_uiux.process}
                    url={ `/.netlify/functions/payment-fund` }
                    body={ JSON.stringify( { data: dataToDB } ) }
                    dataToDB={ dataToDB}
                />

            : _uiux.mode.isUpdate ?
                <UpdateRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/payment-fund?id=${fund.id}` }
                    body={ JSON.stringify( { data: dataToDB } ) }
                    dataToDB={ dataToDB }
                    id={ fund.id }
                />

            : _uiux.mode.isDelete ?
                <DeleteRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/payment-fund?id=${fund.id}` }
                    body={ JSON.stringify( { data: dataToDB } ) }
                    dataToDB={ dataToDB }
                    id={ fund.id }
                />

            : null }
            
            <RowBox key={ index }>
                <RowValue title={ `${fund.id}` }>
                    <span style={ { fontFamily: 'monospace' } } >{ `${fund.code} ` }</span>
                    <span>{ fund.name }</span>
                </RowValue>

                <RowMenu>
                    <CRUDMenu 
                        options={ ! fund.id ? [ 'C' ] : [ 'U', 'D' ] }
                        process={ _uiux.process }
                    />
                </RowMenu>

                { _uiux.form.isOpen ?
                    <FundForm 
                        index={ index } 
                    /> 
                : null }
            </RowBox>

        </CRUDContextProvider>
    );
}

export default Fund;
export { Fund };