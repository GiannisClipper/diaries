import React, { useContext, useEffect } from 'react';

import { ListBox } from '../commons/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../commons/BlockBox';

import { AppBox, AppNav } from '../app/AppPage';

import { AppContext } from '../app/AppContext';

import PaymentGenres from "../payment_genres/Genres";
import PaymentFunds from "../payment_funds/Funds";
import WorkoutGenres from "../workout_genres/Genres";
import WorkoutEquips from "../workout_equips/Equips";

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
                        { lexicon.payment_genres.genres }
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
                        { lexicon.payment_funds.funds }
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
                        { lexicon.workout_genres.genres }
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
                        { lexicon.workout_equips.equips }
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
