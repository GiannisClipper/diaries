import React, { useContext, useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../commons/RowBox';

import { CoreMenu, RetrieveOption } from '../core/CoreMenu';
import presetAction from '../core/helpers/presetAction';
import { retrieveRequestFeature } from '../core/features/requests';

import { urls } from '../app/assets/urls';

import ReportForm from './ReportForm';
import { getPdfContent } from './helpers/getPdfContent';
import { getPdfFile } from './helpers/getPdfFile';

import { AppContext } from '../app/AppContext';
import { DiariesContext } from '../diaries/DiariesContext';

function Report( { reports, index, actions, assets, lexicon } ) {

    const report = reports[ index ];
    const { _uiux, result } = report;

    const { parseToDB } = assets;
    const dataToDB = parseToDB( report );

    const retrieveMode = presetAction( actions.retrieveMode, { assets, index } );
    const openForm = presetAction( actions.openForm, { assets, index } );

    const { username } = useContext( AppContext ).state.signin;
    const { diaries } = useContext( DiariesContext ).state;

    const { diary_id } = dataToDB;
    const diary_title = diaries
        .filter( x => x.id === diary_id )
        .map( x => x.title )
        .reduce( ( result = '', x ) => result += x, '' );

    // request feature

    useEffect( () => {

        if ( _uiux.form.isOpen && _uiux.mode.isRetrieve ) {

            if ( _uiux.status.isResponseOk ) {

                const content = getPdfContent( {
                    lexicon,
                    username,
                    diary_title,
                    type: dataToDB.type,
                    descr: report.descr,
                    groupBy: dataToDB.groupBy,
                    dateFrom: dataToDB.dateFrom,
                    dateTill: dataToDB.dateTill,
                    genre_name: dataToDB.type_specs.genre_name,
                    fund_name: dataToDB.type_specs.fund_name,
                    equip_name: dataToDB.type_specs.equip_name,
                    result
                } );

                getPdfFile( content );
            }

            retrieveRequestFeature( {
                _item: report,
                actions,
                assets,
                index,
                url: urls.reports +
                `?diary_id=${ dataToDB.diary_id }` +
                `&type=${ dataToDB.type }` +
                ( dataToDB.groupBy ? `&groupBy=${ dataToDB.groupBy }` : '' ) +
                `&dateFrom=${ dataToDB.dateFrom }` +
                `&dateTill=${ dataToDB.dateTill }` +
                ( dataToDB.type_specs.genre_id ? `&genre_id=${ dataToDB.type_specs.genre_id }` : '' ) +
                ( dataToDB.type_specs.genre_code ? `&genre_code=${ dataToDB.type_specs.genre_code }` : '' ) +
                ( dataToDB.type_specs.fund_id ? `&fund_id=${ dataToDB.type_specs.fund_id }` : '' ) +
                ( dataToDB.type_specs.fund_code ? `&fund_code=${ dataToDB.type_specs.fund_code }` : '' ) +
                ( dataToDB.type_specs.equip_id ? `&equip_id=${ dataToDB.type_specs.equip_id }` : '' ) +
                ( dataToDB.type_specs.equip_code ? `&equip_code=${ dataToDB.type_specs.equip_code }` : '' )
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