import React from 'react';
import { ListBox } from './libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from './libs/BlockBox';
import SettingsList from "./SettingsList";
import { Genres } from "./payment/Genre";
import { Funds } from "./payment/Fund";
import { heads } from '../storage/texts';

function Settings() {

    return (
        <ListBox>

            <BlockBox>
                <BlockLabel>
                    {heads.settings}
                </BlockLabel>
                <BlockValue>
                    <SettingsList />
                </BlockValue>
            </BlockBox>

            <BlockBox>
                <BlockLabel>
                    {heads.paymentGenres}
                </BlockLabel>
                <BlockValue>
                    <Genres />
                </BlockValue>
            </BlockBox>

            <BlockBox>
                <BlockLabel>
                    {heads.paymentFunds}
                </BlockLabel>
                <BlockValue>
                    <Funds />
                </BlockValue>
            </BlockBox>

        </ListBox>
    );
}

export default Settings;