import React, { useContext, useEffect } from 'react';

import { heads } from '../app/assets/texts';

import { BenchContext } from './BenchContext';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import { AppBox, AppNav } from '../app/AppPage';
import { LinkHome, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../app/AppLinks';

import Genres from "../payment/genre/Genres";
import Funds from "../payment/fund/Funds";

function SettingsPage( { diary_id } ) {

    // useEffect( () => console.log( 'Has rendered. ', 'BenchSettingsPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome />
            <LinkBench id={ diary_id } />
            <LinkReports />
            <LinkBenchSettings id={ diary_id } active />
            <LinkSignout />
        </AppNav>

        <AppBox centeredness>
            <ListBox>

                <BlockBox>
                    <BlockLabel>
                        { heads.payment.genres }
                    </BlockLabel>
                    <BlockValue>
                        <Genres diary_id={ diary_id } />
                    </BlockValue>
                </BlockBox>

                <BlockBox>
                    <BlockLabel>
                        { heads.payment.funds }
                    </BlockLabel>
                    <BlockValue>
                        <Funds diary_id={ diary_id } />
                    </BlockValue>
                </BlockBox>

            </ListBox>
        </AppBox>
        </>
    );
}

export default SettingsPage;
export { SettingsPage };
