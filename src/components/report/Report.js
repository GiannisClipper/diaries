import React, { useContext, useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import { CoreMenu, RetrieveOption } from '../core/CoreMenu';
import presetAction from '../core/helpers/presetAction';
import { retrieveRequestFeature } from '../core/features/requests';

import ReportForm from './ReportForm';
import { paymentsPDF } from './helpers/paymentsPDF';

function Report( { reports, index, actions, assets, lexicon } ) {

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
                    groupBy: dataToDB.groupBy,
                    dateFrom: dataToDB.dateFrom,
                    dateTill: dataToDB.dateTill,
                    genre_name: dataToDB.genre_name,
                    fund_name: dataToDB.fund_name,
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
                ( dataToDB.groupBy ? `&groupBy=${ dataToDB.groupBy }` : '' ) +
                `&dateFrom=${ dataToDB.dateFrom }` +
                `&dateTill=${ dataToDB.dateTill }` +
                ( dataToDB.genre_id ? `&genre_id=${ dataToDB.genre_id }` : '' ) +
                ( dataToDB.fund_id ? `&fund_id=${ dataToDB.fund_id }` : '' )
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