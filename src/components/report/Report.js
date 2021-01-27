import React, { useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import { CoreMenu, RetrieveManyMenuOption } from '../core/CoreMenu';
import presetAction from '../core/helpers/presetAction';
import { retrieveManyRequestFeature } from '../core/features/requests';

import ReportForm from './ReportForm';
import { paymentsPDF } from './helpers/reportPDF';

function Report( { reports, index, actions, assets } ) {

    const report = reports[ index ];
    const { _uiux } = report;

    const { parseToDB } = assets;
    const dataToDB = parseToDB( report );

    const retrieveManyMode = presetAction( actions.retrieveManyMode, { assets, index } );
    const openForm = presetAction( actions.openForm, { assets, index } );

    // request feature

    useEffect( () => {

        retrieveManyRequestFeature( {
            _uiux,
            actions,
            assets,
            url: `/.netlify/functions/report` +
            `?type=${ dataToDB.type }` +
            `&dateFrom=${ dataToDB.dateFrom }` +
            `&dateTill=${ dataToDB.dateTill } `
        } );

    }, [ _uiux, actions, assets, dataToDB ] );

    useEffect( () => {
        if ( _uiux.status.isResponseWaiting ) {
            paymentsPDF( [] );
            _uiux.status = {};
        }
    } );

    return (
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

            { _uiux.form.isOpen ?
                <ReportForm
                    reports={ reports }
                    index={ index }
                    actions={ actions }
                    assets={ assets }
                /> 
            : null }

        </RowBox> 
    );
}

export default Report;
export { Report };