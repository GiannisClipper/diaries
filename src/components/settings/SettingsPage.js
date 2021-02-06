import React, { useContext, useEffect } from 'react';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import { AppContext } from '../app/AppContext';
import { AppBox, AppNav, AppInfo } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkUsers, LinkSettings, LinkSignout } from '../app/AppLinks';
import appLexicons from '../app/assets/lexicons';

import lexicons from './assets/lexicons';
import Settings from './Settings';

import Backup from '../backup/Backup';

function SettingsPage() {

    const { language } = useContext( AppContext ).state.settings;
    const appLexicon = appLexicons[ language ] || appLexicons.DEFAULT;
    const lexicon = lexicons[ language ] || lexicons.DEFAULT;

    useEffect( () => console.log( 'Has rendered. ', 'SettingsPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome title={ appLexicon.home } />
            <LinkDiaries title={ appLexicon.diaries } />
            <LinkBench title={ appLexicon.bench } />
            <LinkUsers title={ appLexicon.users } />
            <LinkSettings title={ appLexicon.settings } active />
            <LinkSignout title={ appLexicon.signout } />
        </AppNav>

        <AppBox centeredness>
            <ListBox>
                <BlockBox>
                    <BlockLabel>
                        { lexicon.settings }
                    </BlockLabel>
                    <BlockValue>
                        <Settings lexicon={ lexicon }/>
                    </BlockValue>
                </BlockBox>

                <BlockBox>
                    <BlockLabel>
                        { lexicon.backup }
                    </BlockLabel>
                    <BlockValue>
                        <Backup lexicon={ lexicon }/>
                    </BlockValue>
                </BlockBox>
            </ListBox>
        </AppBox>

        <AppInfo>
            { lexicon.settings }
        </AppInfo>
        </>
    );
}

export default SettingsPage;
export { SettingsPage };
