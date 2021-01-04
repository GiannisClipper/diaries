import React, { useContext, useEffect } from 'react';

import { ReportsContext } from './ReportsContext';
import { heads } from '../../storage/texts';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import ReportsInit from './ReportsInit';
import Report from './Report';

function Reports() {

    const { state } = useContext( ReportsContext );
    const { reports } = state;

    useEffect( () => console.log( 'Has rendered. ', 'Reports' ) );

    let index = 0;

    return (
        <ListBox>
            <BlockBox>
                <BlockLabel>
                    { heads.reports }
                </BlockLabel>

                <ReportsInit />

                <BlockValue>
                    <ul>
                        { reports.map( report => (
                            <Report 
                                index={ index++ }
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