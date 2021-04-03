import React, { useContext, useEffect } from 'react';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import { AppBox, AppNav } from '../app/AppPage';

import { AppContext } from '../app/AppContext';

import Genres from "../payment/genre/Genres";
import Funds from "../payment/fund/Funds";

function SettingsPage( { diary_id } ) {

    const { lexicon } = useContext( AppContext ).state._uiux;

    // useEffect( () => console.log( 'Has rendered. ', 'BenchSettingsPage' ) );

    return (
        <>
        <AppNav active="diaries" / >

        <AppBox centeredness>
            <ListBox>

                <BlockBox>
                    <BlockLabel>
                        { lexicon.paymentGenre.genres }
                    </BlockLabel>
                    <BlockValue>
                        <Genres 
                            diary_id={ diary_id } 
                            lexicon={ lexicon }
                        />
                    </BlockValue>
                </BlockBox>

                <BlockBox>
                    <BlockLabel>
                        { lexicon.paymentFund.funds }
                    </BlockLabel>
                    <BlockValue>
                        <Funds 
                            diary_id={ diary_id } 
                            lexicon={ lexicon }
                        />
                    </BlockValue>
                </BlockBox>

            </ListBox>
        </AppBox>
        </>
    );
}

export default SettingsPage;
export { SettingsPage };
