import React, { useContext, useEffect } from 'react';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import { heads } from '../app/assets/texts';

import { ReportsContext } from './ReportsContext';
import assets from './assets/assets'; 
import ReportsInit from './ReportsInit';
import Report from './Report';

function Reports() {

    const { state, actions } = useContext( ReportsContext );
    const { reports } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'Reports' ) );

    let index = 0;

    return (
        <ListBox>
            <ReportsInit 
                state={ state }
                actions={ actions }
                assets={ assets }
            />

            <BlockBox>
                <BlockLabel>
                    { heads.reports }
                </BlockLabel>

                <BlockValue>
                    <ul>
                        { reports.map( report => (
                            <Report 
                                reports={ reports }
                                index={ index++ }
                                actions={ actions }
                                assets={ assets }
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