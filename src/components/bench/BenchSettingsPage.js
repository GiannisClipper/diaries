import React, { useState } from 'react';

import { heads } from '../../storage/texts';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import { AppBox, AppNav } from '../app/AppPage';
import { LinkHome, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../app/AppLinks';

import Genres from "../payment/genre/Genres";
import Funds from "../payment/fund/Funds";

function SettingsPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'BenchSettingsPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome />
            <LinkBench />
            <LinkReports />
            <LinkBenchSettings />
            <LinkSignout />
        </AppNav>

        <AppBox centeredness>
            <ListBox>

                <BlockBox>
                    <BlockLabel>
                        { heads.payment.genres }
                    </BlockLabel>
                    <BlockValue>
                        <Genres />
                    </BlockValue>
                </BlockBox>

                <BlockBox>
                    <BlockLabel>
                        { heads.payment.funds }
                    </BlockLabel>
                    <BlockValue>
                        <Funds />
                    </BlockValue>
                </BlockBox>

            </ListBox>
        </AppBox>
        </>
    );
}

export default SettingsPage;
export { SettingsPage };
