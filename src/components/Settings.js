import React from 'react';
import { ListBox } from './libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from './libs/BlockBox';
import GenreList from "./payments/GenreList";
import FundList from "./payments/FundList";

function Settings() {

    return (
        <ListBox>

            <BlockBox>
                <BlockLabel>
                    Κεντρική ημ/νία
                </BlockLabel>
                <BlockValue>
                    <input placeholder="YYYY-MM-DD" />
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