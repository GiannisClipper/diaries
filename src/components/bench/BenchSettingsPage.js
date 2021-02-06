import React, { useContext, useEffect } from 'react';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import { AppBox, AppNav } from '../app/AppPage';
import { LinkHome, LinkBench, LinkReports, LinkBenchSettings, LinkSignout } from '../app/AppLinks';

import { AppContext } from '../app/AppContext';
import appLexicons from '../app/assets/lexicons';

import Genres from "../payment/genre/Genres";
import Funds from "../payment/fund/Funds";

function SettingsPage( { diary_id } ) {

    const { language } = useContext( AppContext ).state.settings;
    const appLexicon = appLexicons[ language ] || appLexicons.DEFAULT;

    // useEffect( () => console.log( 'Has rendered. ', 'BenchSettingsPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome title={ appLexicon.home } />
            <LinkBench title={ appLexicon.bench } id={ diary_id } />
            <LinkReports title={ appLexicon.reports } />
            <LinkBenchSettings title={ appLexicon.bench_settings } id={ diary_id } active />
            <LinkSignout title={ appLexicon.signout } />
        </AppNav>

        <AppBox centeredness>
            <ListBox>

                <BlockBox>
                    <BlockLabel>
                        { appLexicon.payment_genres }
                    </BlockLabel>
                    <BlockValue>
                        <Genres diary_id={ diary_id } />
                    </BlockValue>
                </BlockBox>

                <BlockBox>
                    <BlockLabel>
                        { appLexicon.payment_funds }
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
