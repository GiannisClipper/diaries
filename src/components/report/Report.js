import React, { useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import { RetrieveManyRequest } from '../core/CoreRequests';
import { CoreMenu, RetrieveManyMenuOption } from '../core/CoreMenu';
import prepayAction from '../core/helpers/prepayAction';

import { ReportsContext } from './ReportsContext';
import ReportForm from './ReportForm';
import { paymentsPDF } from './helpers/reportPDF';

function Report( { reports, index, actions, assets } ) {

    const report = reports[ index ];
    const { _uiux } = report;

    const { parseToDB } = assets;
    const dataToDB = parseToDB( report );

    const retrieveManyMode = prepayAction( actions.retrieveManyMode, { assets, index } );
    const openForm = prepayAction( actions.openForm, { assets, index } );

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
                assets={ assets }
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
                        <RetrieveManyMenuOption 
                            retrieveManyMode={ retrieveManyMode }
                            openForm={ openForm } 
                        />
                    </CoreMenu>
                </RowMenu>
            </RowBox> 

            { _uiux.form.isOpen ?
                <ReportForm
                    reports={ reports }
                    index={ index }
                    actions={ actions }
                    assets={ assets }
                /> 
            : null }

        </>
    );
}

export default Report;
export { Report };