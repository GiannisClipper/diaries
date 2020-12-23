import React, { useContext } from 'react';
import { CRUDContextProvider, RetrieveManyRequest } from '../libs/CRUD';
import { AppContext } from '../app/AppContext';

function UserInit() {

    const { state, dispatch } = useContext( AppContext );
    const { _uiux } = state;

    return (
        <CRUDContextProvider
            dispatch={ dispatch }
            namespace={ 'users' }
            //modes={ { retrieveMany: true } }
        >
            <RetrieveManyRequest 
                process={ _uiux.users.process }
                url={ `/.netlify/functions/user` }
            />
        </CRUDContextProvider>
    );
}

export { UserInit };