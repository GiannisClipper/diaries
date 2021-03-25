import React, { useContext, useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import { CoreMenu, RetrieveOption } from '../core/CoreMenu';
import presetAction from '../core/helpers/presetAction';
import { retrieveRequestFeature } from '../core/features/requests';

import ReportForm from './ReportForm';
import { paymentsPDF } from './helpers/paymentsPDF';

import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';

function Report( { reports, index, actions, assets, lexicon } ) {

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
                    lexicon,
                    username: 'username',
                    diary_title: 'diary title',
                    type: dataToDB.type,
                    descr: report.descr,
                    dateFrom: dataToDB.dateFrom,
                    dateTill: dataToDB.dateTill,
                    groupBy: dataToDB.groupBy,
                    result
                } );
            }

            retrieveRequestFeature( {
                _item: report,
                actions,
                assets,
                index,
                url: `/.netlify/functions/report` +
                `?diary_id=${ dataToDB.diary_id }` +
                `&type=${ dataToDB.type }` +
                `&dateFrom=${ dataToDB.dateFrom }` +
                `&dateTill=${ dataToDB.dateTill }` +
                `&groupBy=${ dataToDB.groupBy }`
            } );
        }

    } );

    return (
        <RowBox key={ index }>

            <RowValue title={ `` }>
                <span>{ report.descr }</span>
            </RowValue>

            <RowMenu>
                <CoreMenu status={ _uiux.status } >
                    <RetrieveOption 
                        lexicon={ lexicon }
                        onClick={ () => { 
                            retrieveMode(); 
                            openForm(); 
                        } }
                    />
                </CoreMenu>
            </RowMenu>

            { _uiux.form.isOpen ?
                <ReportForm
                    reports={ reports }
                    index={ index }
                    actions={ actions }
                    assets={ assets }
                    lexicon={ lexicon }
                /> 
            : null }

        </RowBox> 
    );
}

export default Report;
export { Report };