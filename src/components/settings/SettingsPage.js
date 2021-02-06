import React, { useContext, useEffect } from 'react';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import { LanguageContext } from '../core/LanguageContext';

import { AppBox, AppNav, AppInfo } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkUsers, LinkSettings, LinkSignout } from '../app/AppLinks';

import Settings from './Settings';
import Backup from '../backup/Backup';

function SettingsPage() {

    const { lexicon } = useContext( LanguageContext ).state;

    useEffect( () => console.log( 'Has rendered. ', 'SettingsPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome />
            <LinkDiaries />
            <LinkBench />
            <LinkUsers />
            <LinkSettings active />
            <LinkSignout />
        </AppNav>

        <AppBox centeredness>
            <ListBox>
                <BlockBox>
                    <BlockLabel>
                        { lexicon.head_settings }
                    </BlockLabel>
                    <BlockValue>
                        <Settings />
                    </BlockValue>
                </BlockBox>

                <BlockBox>
                    <BlockLabel>
                        { lexicon.head_backup }
                    </BlockLabel>
                    <BlockValue>
                        <Backup />
                    </BlockValue>
                </BlockBox>
            </ListBox>
        </AppBox>

        <AppInfo>
            { lexicon.head_settings }
        </AppInfo>
        </>
    );
}

export default SettingsPage;
export { SettingsPage };
