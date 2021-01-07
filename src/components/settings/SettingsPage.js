import React, { useState } from 'react';

import { heads } from '../../storage/texts';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import { AppBox, AppNav } from '../app/AppPage';
import { LinkHome, LinkDiaries, LinkBench, LinkUsers, LinkSettings, LinkSignout } from '../app/AppLinks';

import Settings from './Settings';
import Backup from './Backup';

function SettingsPage() {

    //useEffect( () => console.log( 'Has rendered. ', 'SettingsPage' ) );

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
                        { heads.settings }
                    </BlockLabel>
                    <BlockValue>
                        <Settings />
                    </BlockValue>
                </BlockBox>

                <BlockBox>
                    <BlockLabel>
                        { heads.backup }
                    </BlockLabel>
                    <BlockValue>
                        <Backup />
                    </BlockValue>
                </BlockBox>
            </ListBox>
        </AppBox>
        </>
    );
}

export default SettingsPage;
export { SettingsPage };
