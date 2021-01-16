import React, { useContext, useEffect } from 'react';

import { ReportsContext } from './ReportsContext';
import { RetrieveManyRequest } from '../core/CoreRequests';
import { CoreMenu, RetrieveManyMenuOption } from '../core/CoreMenu';
import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import ReportForm from './ReportForm';
import { paymentsPDF } from './assets/reportPDF';

function Report( { index } ) {

    const { state, actions, assets } = useContext( ReportsContext );
    const { reports } = state;
    const report = reports[ index ];
    const { _uiux } = report;
    const { parseToDB } = assets;
    const dataToDB = parseToDB( report );

    const openForm = payload => actions.openForm( { index, ...payload } );

    useEffect( () => {
        if ( _uiux.status.isResponseWaiting ) {
            paymentsPDF( [] );
            _uiux.status = {};
        }
    } );

    return (
        <>
            <RetrieveManyRequest 
                Context={ ReportsContext }
                url={ `/.netlify/functions/report` +
                    `?type=${ dataToDB.type }` +
                    `&dateFrom=${ dataToDB.dateFrom }` +
                    `&dateTill=${ dataToDB.dateTill } `
                }
            />

            <RowBox key={ index }>
                <RowValue title={ `` }>
                    <span>{ report.descr }</span>
                </RowValue>

                <RowMenu>
                    <CoreMenu status={ _uiux.status } >
                        <RetrieveManyMenuOption openForm={ openForm } />
                    </CoreMenu>
                </RowMenu>
            </RowBox> 

            { _uiux.form.isOpen ?
                <ReportForm
                    index={ index }
                /> 
            : null }

        </>
    );
}

export default Report;
export { Report };