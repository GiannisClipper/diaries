import React, { useContext, useEffect } from 'react';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import { AppBox, AppNav } from '../app/AppPage';
import { LinkHome, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../app/AppLinks';

import { AppContext } from '../app/AppContext';

import Genres from "../payment/genre/Genres";
import Funds from "../payment/fund/Funds";

function SettingsPage( { diary_id } ) {

    const { lexicon } = useContext( AppContext ).state._uiux;

    // useEffect( () => console.log( 'Has rendered. ', 'BenchSettingsPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome title={ lexicon.home } />
            <LinkBench title={ lexicon.bench.bench } id={ diary_id } />
            <LinkReports title={ lexicon.report.reports } />
            <LinkBenchSettings title={ lexicon.bench.settings } id={ diary_id } active />
            <LinkSignout title={ lexicon.signin.signout } />
        </AppNav>

        <AppBox centeredness>
            <ListBox>

                <BlockBox>
                    <BlockLabel>
                        { lexicon.paymentGenre.genres }
                    </BlockLabel>
                    <BlockValue>
                        <Genres diary_id={ diary_id } />
                    </BlockValue>
                </BlockBox>

                <BlockBox>
                    <BlockLabel>
                        { lexicon.paymentFund.funds }
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
