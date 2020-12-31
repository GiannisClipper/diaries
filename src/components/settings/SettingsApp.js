import React, { useState } from 'react';

//import { ReportsContextProvider } from './ReportsContext';
import { heads } from '../../storage/texts';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import Settings from './Settings';
import DiaryApp from '../diary/DiaryApp';
import { Genres } from "../payment/Genre";
import { Funds } from "../payment/Fund";

function SettingsApp() {

    // useEffect( () => console.log( 'Has rendered. ', 'ReportApp' ) );

    return (
//        <ReportsContextProvider>

        <ListBox>
            <BlockBox>
                <BlockLabel>
                    { heads.settings }
                </BlockLabel>
                <BlockValue>
                    <Settings />
                </BlockValue>
            </BlockBox>

            <BlockBox>
                <BlockLabel>
                    { heads.diaries }
                </BlockLabel>
                <BlockValue>
                    <DiaryApp />
                </BlockValue>
            </BlockBox>

            <BlockBox>
                <BlockLabel>
                    { heads.paymentGenres }
                </BlockLabel>
                <BlockValue>
                    <Genres />
                </BlockValue>
            </BlockBox>

            <BlockBox>
                <BlockLabel>
                    { heads.paymentFunds }
                </BlockLabel>
                <BlockValue>
                    <Funds />
                </BlockValue>
            </BlockBox>

        </ListBox>

//        </ReportsContextProvider>
    );
}

export default SettingsApp;
export { SettingsApp };
