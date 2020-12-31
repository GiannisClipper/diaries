import React, { useContext, useEffect } from 'react';

import { DiariesContext } from './DiariesContext';
import { heads } from '../../storage/texts';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import DiaryInit from './DiaryInit';
import Diary from './Diary';

function Diaries() {

    const { state } = useContext( DiariesContext );
    const { diaries } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'Diaries' ) );

    let index = 0;

    return (
        <ListBox>
            <DiaryInit />

            <BlockBox>
                <BlockLabel>
                    { heads.diaries }
                </BlockLabel>

                <BlockValue>
                    <ul>
                        { diaries.map( diary => (
                            <Diary
                                index={ index++ }
                                key={ index } 
                            />
                        ) ) }
                    </ul>
                </BlockValue>
            </BlockBox>
        </ListBox>
    );
}

export default Diaries;
export { Diaries };