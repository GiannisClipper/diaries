import React, { createContext, useReducer, useEffect } from 'react';
import { diaryReducer } from '../../storage/diary/reducers';

const DiaryContext = createContext();

const DiaryContextProvider = props => {

    const [ state, dispatch ] = useReducer( diaryReducer, props.state );

    useEffect( () => console.log( 'Has rendered. ', 'DiaryContextProvider' ) );

    return (
        <DiaryContext.Provider value={{ state, dispatch }}>
            { props.children }
        </DiaryContext.Provider>
    )
}

export { DiaryContext, DiaryContextProvider };