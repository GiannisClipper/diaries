import React, { useContext, useEffect } from 'react';
import { STATEContext } from './STATEContext';
import { heads } from '../storage/texts';

import { ListBox } from './libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from './libs/BlockBox';
import { RowBox, RowValue, RowMenu } from './libs/RowBox';

import { CRUDContextProvider, RetrieveManyRequest, CRUDMenu } from './libs/CRUD';

import ReportInit from './ReportInit';
import ReportForm from './ReportForm';
import { parseReportToDB } from '../storage/parsers';

const namespace = 'reports';

function ReportList() {

    const STATE = useContext( STATEContext );
    const { init } = STATE.state.uiux;
    const { reports } = STATE.state.data;

    useEffect( () => {
        console.log( 'Has rendered. ', 'ReportList' );
    } );

    let index = -1;

    return (
        <ListBox>
            <BlockBox>
                <BlockLabel>
                    {heads.reports}
                </BlockLabel>

                <ReportInit process={init.reports.process} />

                <BlockValue>
                    <ul>
                        { reports.map( report => (
                            <Report key={++index} index={index} reports={reports} />
                        ) ) }
                    </ul>
                </BlockValue>
            </BlockBox>
        </ListBox>
    );
}

function Report( { index, reports } ) {

    const report = reports[ index ];

    const STATE = useContext( STATEContext )
    const { dispatch } = STATE;
    const payload = { index };
    const dataToDB = parseReportToDB( report.data );

    return (
        <CRUDContextProvider 
            dispatch={dispatch}
            namespace={namespace}
            payload={payload}
        >

            <RetrieveManyRequest 
                process={report.uiux.process}
                url={`/.netlify/functions/report` +
                    `?type=${dataToDB.type}` +
                    `&dateFrom=${dataToDB.dateFrom}` +
                    `&dateTill=${dataToDB.dateTill}`
                }
            />

            <RowBox key={index}>
                <RowValue title={``}>
                    <span>{report.data.descr}</span>
                </RowValue>

                <RowMenu>
                    <CRUDMenu
                        options={[ 'RM' ]}
                        process={report.uiux.process}
                    />
                </RowMenu>

                { report.uiux.form.isOpen ?
                    <ReportForm
                        reports={reports} 
                        index={index} 
                    /> 
                : null }
            </RowBox>
        </CRUDContextProvider>
    );
}

export default ReportList;