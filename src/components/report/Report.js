import React, { useContext, useEffect } from 'react';

import { CoreContextProvider } from '../core/CoreContext';
import actions from '../../storage/core/actions';
import { RetrieveManyRequest } from '../core/CoreRequests';
import CoreMenu from '../core/CoreMenu';

import { ReportsContext } from './ReportsContext';
import { parseReportToDB } from '../../storage/report/parsers';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import ReportForm from './ReportForm';
import { paymentsPDF } from '../../storage/reportPDF';

function Report( { index } ) {

    const { state, dispatch } = useContext( ReportsContext );
    const { reports } = state;
    const report = reports[ index ];
    const { _uiux } = report;

    const payload = { index };
    const dataToDB = parseReportToDB( report );

    useEffect( () => {
        if ( _uiux.process.isResponseWaiting ) {
            paymentsPDF( [] );
            report.uiux.process = {};
        }
    } );

    return (
        <CoreContextProvider 
            actions={ [ 
                actions.form, 
                actions.validation, 
                actions.retrieveMany,
            ] }
            dispatch={ dispatch }
            payload={ payload }
        >

            <RetrieveManyRequest 
                process={ _uiux.process }
                url={ `/.netlify/functions/report` +
                    `?type=${dataToDB.type}` +
                    `&dateFrom=${dataToDB.dateFrom}` +
                    `&dateTill=${dataToDB.dateTill} `
                }
            />

            <RowBox key={ index }>
                <RowValue title={ `` }>
                    <span>{ report.descr }</span>
                </RowValue>

                <RowMenu>
                    <CoreMenu
                        options={ [ 'RM' ] }
                        process={ _uiux.process }
                    />
                </RowMenu>

                { _uiux.form.isOpen ?
                    <ReportForm
                        report={ report }
                    /> 
                : null }
            </RowBox>
        </CoreContextProvider>
    );
}

export default Report;
export { Report };