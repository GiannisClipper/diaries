import React, { useContext, useEffect } from 'react';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import { AppContext } from '../app/AppContext';
import { AppBox, AppNav, AppInfo } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkUsers, LinkSettings, LinkSignout } from '../app/AppLinks';

import Settings from './Settings';

import Backup from '../backup/Backup';

function SettingsPage() {

    const { lexicon } = useContext( AppContext ).state._uiux;

    useEffect( () => console.log( 'Has rendered. ', 'SettingsPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome title={ lexicon.home } />
            <LinkDiaries title={ lexicon.diary.diaries } />
            <LinkBench title={ lexicon.bench.bench } />
            <LinkUsers title={ lexicon.user.users } />
            <LinkSettings title={ lexicon.settings.settings } active />
            <LinkSignout title={ lexicon.signin.signout } />
        </AppNav>

        <AppBox centeredness>
            <ListBox>
                <BlockBox>
                    <BlockLabel>
                        { lexicon.settings.settings }
                    </BlockLabel>
                    <BlockValue>
                        <Settings lexicon={ lexicon }/>
                    </BlockValue>
                </BlockBox>

                <BlockBox>
                    <BlockLabel>
                        { lexicon.settings.backup }
                    </BlockLabel>
                    <BlockValue>
                        <Backup lexicon={ lexicon }/>
                    </BlockValue>
                </BlockBox>
            </ListBox>
        </AppBox>

        <AppInfo>
            { lexicon.settings.settings }
        </AppInfo>
        </>
    );
}

export default SettingsPage;
export { SettingsPage };
