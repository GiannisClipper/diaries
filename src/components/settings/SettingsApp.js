import React, { useState } from 'react';

//import { ReportsContextProvider } from './ReportsContext';
import { heads } from '../../storage/texts';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import Settings from './Settings';
import DiaryApp from '../diary/DiaryApp';
import GenreApp from "../payment/genre/GenreApp";
import FundApp from "../payment/fund/FundApp";

function SettingsApp() {

    //useEffect( () => console.log( 'Has rendered. ', 'SettingsApp' ) );

    return (
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
                    { heads.payment.genres }
                </BlockLabel>
                <BlockValue>
                    <GenreApp />
                </BlockValue>
            </BlockBox>

            <BlockBox>
                <BlockLabel>
                    { heads.payment.funds }
                </BlockLabel>
                <BlockValue>
                    <FundApp />
                </BlockValue>
            </BlockBox>

        </ListBox>
    );
}

export default SettingsApp;
export { SettingsApp };
