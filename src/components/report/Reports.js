import React, { useContext, useEffect } from 'react';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import { ReportsContext } from './ReportsContext';
import assets from './assets/assets';
import ReportsLoader from './ReportsLoader';
import Report from './Report';

import GenresLoader from '../payment/genre/GenresLoader';

import FundsLoader from '../payment/fund/FundsLoader';

function Reports( { diary_id, lexicon } ) {

    const { state, actions } = useContext( ReportsContext );
    const { reports } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'Reports' ) );

    let index = 0;

    return (
        <ListBox>
            <GenresLoader
                diary_id={ diary_id }
            />

            <FundsLoader 
                diary_id={ diary_id }
            />

            <ReportsLoader 
                diary_id={ diary_id }
                lexicon={ lexicon }
            />

            <BlockBox>
                <BlockLabel>
                    { lexicon.report.reports }
                </BlockLabel>

                <BlockValue>
                    <ul>
                        { reports.map( report => (
                            <Report 
                                reports={ reports }
                                index={ index++ }
                                actions={ actions }
                                assets={ assets }
                                lexicon={ lexicon }
                                key={ index } 
                            />
                        ) ) }
                    </ul>
                </BlockValue>
            </BlockBox>
        </ListBox>
    );
}

export default Reports;
export { Reports };