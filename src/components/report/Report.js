import React, { useContext, useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import { CoreMenu, RetrieveMenuOption } from '../core/CoreMenu';
import presetAction from '../core/helpers/presetAction';
import { retrieveRequestFeature } from '../core/features/requests';

import ReportForm from './ReportForm';
import { paymentsPDF } from './helpers/paymentsPDF';

import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';

function Report( { reports, index, actions, assets } ) {

    const  { genres } = useContext( GenresContext ).state;
    const  { funds } = useContext( FundsContext ).state;

    const report = reports[ index ];
    const { _uiux, result } = report;

    const { parseToDB } = assets;
    const dataToDB = parseToDB( report );

    const retrieveMode = presetAction( actions.retrieveMode, { assets, index } );
    const openForm = presetAction( actions.openForm, { assets, index } );

    // request feature

    useEffect( () => {

        if ( _uiux.form.isOpen && _uiux.mode.isRetrieve ) {

            if ( _uiux.status.isResponseOk ) {
                paymentsPDF( {
                    descr: report.descr,
                    dateFrom: dataToDB.dateFrom,
                    dateTill: dataToDB.dateTill,
                    result,
                    genres,
                    funds,
                } );
            }
    
            retrieveRequestFeature( {
                _item: report,
                actions,
                assets,
                index,
                url: `/.netlify/functions/report` +
                `?type=${ dataToDB.type }` +
                `&dateFrom=${ dataToDB.dateFrom }` +
                `&dateTill=${ dataToDB.dateTill }`
            } );
        }

    }, [ _uiux, report, actions, assets, index, dataToDB, result ] );

    // useEffect( () => {
    //     if ( _uiux.status.isResponseOkAfter ) {
    //         paymentsPDF( result );
    //         _uiux.status = {};
    //     }
    // } );

    return (
        <RowBox key={ index }>

            <RowValue title={ `` }>
                <span>{ report.descr }</span>
            </RowValue>

            <RowMenu>
                <CoreMenu status={ _uiux.status } >
                    <RetrieveMenuOption 
                        retrieveMode={ retrieveMode }
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