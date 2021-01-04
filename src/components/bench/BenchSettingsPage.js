import React, { useState } from 'react';

import { heads } from '../../storage/texts';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import { AppBox, AppNav, LinkHome, LinkBench, LinkReports, LinkSettings, LinkSignout } from '../app/AppPage';

import Settings from './Settings';
import GenrePage from "../payment/genre/GenrePage";
import FundPage from "../payment/fund/FundPage";

function SettingsPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'SettingsPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome />
            <LinkBench />
            <LinkReports />
            <LinkSettings />
            <LinkSignout />
        </AppNav>

        <AppBox centeredness>
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
                        { heads.payment.genres }
                    </BlockLabel>
                    <BlockValue>
                        <GenrePage />
                    </BlockValue>
                </BlockBox>

                <BlockBox>
                    <BlockLabel>
                        { heads.payment.funds }
                    </BlockLabel>
                    <BlockValue>
                        <FundPage />
                    </BlockValue>
                </BlockBox>

            </ListBox>
        </AppBox>
        </>
    );
}

export default SettingsPage;
export { SettingsPage };
