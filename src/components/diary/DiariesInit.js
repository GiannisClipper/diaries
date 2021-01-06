import React, { useContext, useEffect } from 'react';
import { CoreContextProvider } from '../core/CoreContext';
import actions from '../../storage/core/actions';
import { diarySchema } from '../../storage/schemas';
import { parseDiaryFromDB } from '../../storage/diary/parsers';
import { RetrieveManyRequest } from '../core/CoreRequests';
import { DiariesContext } from './DiariesContext';
import { AppContext } from '../app/AppContext';

function DiariesInit() {

    const { user_id } = useContext( AppContext ).state.signin;

    const { state, dispatch } = useContext( DiariesContext );
    const { _uiux } = state;

    const payload = {
        _namespace: 'diaries',
        _schema: diarySchema,
        _parseFromDB: parseDiaryFromDB,
        _sort: null,
    };

    //useEffect( () => console.log( 'Has rendered. ', 'DiariesInit' ) );

    return (
        <CoreContextProvider
            actions={ [ actions.retrieveMany ] }
            dispatch={ dispatch }
            payload={ payload }
        >
            <RetrieveManyRequest 
                process={ _uiux.process }
                url={ `/.netlify/functions/diary?user_id=${user_id}` }
            />
        </CoreContextProvider>
    );
}

export default DiariesInit;
export { DiariesInit };