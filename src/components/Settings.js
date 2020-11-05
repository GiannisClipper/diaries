import React from 'react';
import { ListBox } from './libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from './libs/BlockBox';
import SettingsList from "./SettingsList";
import GenreList from "./payments/GenreList";
import FundList from "./payments/FundList";

function Settings() {

    return (
        <ListBox>

            <BlockBox>
                <BlockLabel>
                    Ρυθμίσεις
                </BlockLabel>
                <BlockValue>
                    <SettingsList />
                </BlockValue>
            </BlockBox>

            <BlockBox>
                <BlockLabel>
                    Κατηγορίες οικονομικών κινήσεων
                </BlockLabel>
                <BlockValue>
                    <GenreList />
                </BlockValue>
            </BlockBox>

            <BlockBox>
                <BlockLabel>
                    Μέσα οικονομικών κινήσεων
                </BlockLabel>
                <BlockValue>
                    <FundList />
                </BlockValue>
            </BlockBox>

        </ListBox>
    );
}

export default Settings;