import React, { useContext, useEffect } from 'react';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import { ReportsContext } from './ReportsContext';
import assets from './assets/assets'; 
import ReportsLoader from './ReportsLoader';
import Report from './Report';

function Reports( { lexicon } ) {

    const { state, actions } = useContext( ReportsContext );
    const { reports } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'Reports' ) );

    let index = 0;

    return (
        <ListBox>
            <ReportsLoader 
                state={ state }
                actions={ actions }
                assets={ assets }
                lexicon={ lexicon }
            />

            <BlockBox>
                <BlockLabel>
                    { lexicon.reports }
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