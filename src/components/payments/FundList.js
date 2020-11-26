import React, { useContext, useEffect } from 'react';
import { STATEContext } from '../STATEContext';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import { CRUDContextProvider, CRUDMenu, CreateRequest, UpdateRequest, DeleteRequest, RetrieveAllRequest } from '../libs/CRUD';
import FundForm from './FundForm';
import { parseFundToDB } from '../../storage/payments/parsers';

const namespace = 'payments.funds';

function FundList() {

    const STATE = useContext( STATEContext );
    const { funds } = STATE.state.data.payments;

    useEffect( () => {
        console.log( 'Has rendered. ', 'payments/FundList' );
    } );

    let index = -1;

    return (
        <ul>
            <FundInit />
            { funds.map( fund => (
                <Fund key={++index} index={index} funds={funds} />
            ) ) }
        </ul>
    );
}

function FundInit() {

    const STATE = useContext( STATEContext )
    const { dispatch } = STATE;
    const { init } = STATE.state.uiux;

    useEffect( () => {
        console.log( 'Has rendered. ', 'payments/FundInit' );
    } );

    return (
        <CRUDContextProvider 
            dispatch={dispatch}
            namespace={namespace}
        >
            <RetrieveAllRequest 
                process={init.payments.funds.process}
                url={`/.netlify/functions/payments-fund`}
            />
        </CRUDContextProvider>
    );
}

function Fund( { index, funds } ) {

    const fund = funds[ index ];

    const STATE = useContext( STATEContext )
    const { dispatch } = STATE;
    const payload = { index, _saved: fund.data };
    const dataToDB =  parseFundToDB( fund.data );

    return (
        <CRUDContextProvider 
            dispatch={dispatch} 
            namespace={namespace} 
            payload={payload}
        >
            { fund.uiux.mode.isCreate ?
                <CreateRequest
                    process={fund.uiux.process}
                    url={ `/.netlify/functions/payments-fund`}
                    body={JSON.stringify( { data: dataToDB } )}
                    dataToDB={dataToDB}
                />
            : fund.uiux.mode.isUpdate ?
                <UpdateRequest 
                    process={fund.uiux.process}
                    url={`/.netlify/functions/payments-fund?id=${fund.data.id}`}
                    body={JSON.stringify( { data: dataToDB } )}
                    dataToDB={dataToDB}
                    id={fund.data.id}
                />
            : fund.uiux.mode.isDelete ?
                <DeleteRequest 
                    process={fund.uiux.process}
                    url={`/.netlify/functions/payments-fund?id=${fund.data.id}`}
                    body={JSON.stringify( { data: dataToDB } )}
                    dataToDB={dataToDB}
                    id={fund.data.id}
                />
            : null }
            
            <RowBox key={index}>
                <RowValue title={`${fund.data.id}`}>
                    <span style={{ fontFamily: 'monospace' }} >{`${fund.data.code} `}</span>
                    <span>{fund.data.name}</span>
                </RowValue>

                <RowMenu>
                    <CRUDMenu 
                        process={fund.uiux.process}
                        status={fund.uiux.status}
                        id={fund.data.id}
                    />
                </RowMenu>

                { fund.uiux.form.isOpen ?
                    <FundForm 
                        funds={funds} 
                        index={index} 
                    /> 
                : null }
            </RowBox>
        </CRUDContextProvider>
    );
}

export default FundList;
export { FundInit, FundList };