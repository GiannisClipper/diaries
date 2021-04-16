import React, { useContext, useEffect } from 'react';

import { ListBox } from '../commons/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../commons/BlockBox';

import { AppBox, AppNav } from '../app/AppPage';

import { AppContext } from '../app/AppContext';

import PaymentGenres from "../payment_genre/Genres";
import PaymentFunds from "../payment_fund/Funds";
import WorkoutGenres from "../workout_genre/Genres";
import WorkoutEquips from "../workout_equip/Equips";

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
                        <PaymentGenres 
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
                        <PaymentFunds 
                            diary_id={ diary_id } 
                            lexicon={ lexicon }
                        />
                    </BlockValue>
                </BlockBox>

                <BlockBox>
                    <BlockLabel>
                        { lexicon.workoutGenre.genres }
                    </BlockLabel>
                    <BlockValue>
                        <WorkoutGenres 
                            diary_id={ diary_id } 
                            lexicon={ lexicon }
                        />
                    </BlockValue>
                </BlockBox>

                <BlockBox>
                    <BlockLabel>
                        { lexicon.workoutEquip.equips }
                    </BlockLabel>
                    <BlockValue>
                        <WorkoutEquips 
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
