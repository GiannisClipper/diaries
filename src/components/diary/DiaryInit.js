import React, { useContext, useEffect } from 'react';
import { CoreContextProvider } from '../core/CoreContext';
import actions from '../../storage/core/actions';
import { RetrieveManyRequest } from '../core/CoreRequests';
import { DiariesContext } from './DiariesContext';

function DiaryInit() {

    const { state, dispatch } = useContext( DiariesContext );
    const { _uiux } = state;

    //useEffect( () => console.log( 'Has rendered. ', 'DiaryInit' ) );

    return (
        <CoreContextProvider
            actions={ [ actions.retrieveMany ] }
            dispatch={ dispatch }
        >
            <RetrieveManyRequest 
                process={ _uiux.process }
                url={ `/.netlify/functions/diary` }
            />
        </CoreContextProvider>
    );
}

export default DiaryInit;
export { DiaryInit };