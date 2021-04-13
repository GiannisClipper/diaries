import React, { useContext, useEffect } from 'react';

import { ListBox } from '../commons/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../commons/BlockBox';

import { AppContext } from '../app/AppContext';
import { AppBox, AppNav, AppInfo } from '../app/AppPage';

import Settings from './Settings';

import Backup from '../backup/Backup';

function SettingsPage() {

    const { lexicon } = useContext( AppContext ).state._uiux;

    useEffect( () => console.log( 'Has rendered. ', 'SettingsPage' ) );

    return (
        <>
        <AppNav active="settings" / >

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
                        { lexicon.backup.backup }
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
