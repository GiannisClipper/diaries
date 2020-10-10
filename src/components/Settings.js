import React from 'react';
import { List, Block } from './libs/List';
import GenreList from "./payments/GenreList";
import FundList from "./payments/FundList";

function Settings() {

    return (
        <List>
            <Block label='Κεντρική ημ/νία'>
                <input placeholder="YYYY-MM-DD" />
            </Block>

            <Block label='Κατηγορίες οικονομικών κινήσεων'>
                <GenreList />
            </Block>

            <Block label='Μέσα οικονομικών κινήσεων'>
                <FundList />
            </Block>
        </List>
    );
}

export default Settings;