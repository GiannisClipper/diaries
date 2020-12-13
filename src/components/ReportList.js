import React, { useContext, useEffect } from 'react';
import { STATEContext } from './STATEContext';
import { heads } from '../storage/texts';

import { ListBox } from './libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from './libs/BlockBox';
import { RowBox, RowValue, RowMenu } from './libs/RowBox';

import { RetrieveManyContextProvider, RetrieveManyRequest, RetrieveManyMenu } from './libs/RetrieveMany';

import ReportForm from './ReportForm';

const namespace = 'reports';

function ReportList() {

    const STATE = useContext( STATEContext );
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

    return (
        <RetrieveManyContextProvider 
            dispatch={dispatch}
            namespace={namespace}
            payload={payload}
        >
            <RetrieveManyRequest 
                process={report.uiux.process}
                url={`/.netlify/functions/report?type=${report.data.type}`}
            />

            <RowBox key={index}>
                <RowValue title={``}>
                    <span>{report.data.descr}</span>
                </RowValue>

                <RowMenu>
                    <RetrieveManyMenu
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
        </RetrieveManyContextProvider>
    );
}

export default ReportList;