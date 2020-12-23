import React from 'react';
import { ListBox } from './libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from './libs/BlockBox';
import SettingsList from "./SettingsList";
import GenreList from "./entry/payment/GenreList";
import FundList from "./entry/payment/FundList";
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
                    {heads.payment_genres}
                </BlockLabel>
                <BlockValue>
                    <GenreList />
                </BlockValue>
            </BlockBox>

            <BlockBox>
                <BlockLabel>
                    {heads.payment_funds}
                </BlockLabel>
                <BlockValue>
                    <FundList />
                </BlockValue>
            </BlockBox>

        </ListBox>
    );
}

export default Settings;