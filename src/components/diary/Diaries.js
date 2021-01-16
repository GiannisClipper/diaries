import React, { useContext, useEffect } from 'react';

import { ListBox } from '../libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from '../libs/BlockBox';

import { AppContext } from '../app/AppContext';
import { heads } from '../app/assets/texts';

import { DiariesContext } from './DiariesContext';
import assets from './assets/assets'; 
import DiariesInit from './DiariesInit';
import Diary from './Diary';

function Diaries() {

    const { user_id } = useContext( AppContext ).state.signin;
    const { schema } = assets;
    assets.schema = () => ( { ...schema(), user_id } );

    const { state, actions } = useContext( DiariesContext );
    const { diaries } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'Diaries' ) );

    let index = 0;

    return (
        <ListBox>
            <DiariesInit 
                state={ state }
                actions={ actions }
                assets={ assets }
            />

            <BlockBox>
                <BlockLabel>
                    { heads.diaries }
                </BlockLabel>

                <BlockValue>
                    <ul>
                        { diaries.map( diary => (
                            <Diary
                                diaries={ diaries }
                                index={ index++ }
                                actions={ actions }
                                assets={ assets }
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