import React, { useContext, useEffect } from 'react';
import { CRUDContextProvider, RetrieveManyRequest } from '../libs/CRUD';
import { DiariesContext } from './DiariesContext';

function DiaryInit() {

    const { state, dispatch } = useContext( DiariesContext );
    const { _uiux } = state;

    //useEffect( () => console.log( 'Has rendered. ', 'DiaryInit' ) );

    return (
        <CRUDContextProvider
            dispatch={ dispatch }
        >
            <RetrieveManyRequest 
                process={ _uiux.process }
                url={ `/.netlify/functions/diary` }
            />
        </CRUDContextProvider>
    );
}

export default DiaryInit;
export { DiaryInit };