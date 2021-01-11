import React, { createContext, useReducer, useEffect } from 'react';
import comboReducer from '../../helpers/comboReducer';
import { datesReducer } from '../../storage/date/reducers';
import retrieveManyActionTypes from '../../storage/core/actions/retrieveMany';
import createActions from '../../helpers/createActions';

const reducers = [ 
    datesReducer
];

const customization = {
};

const actionTypes = {
    ...retrieveManyActionTypes
};

const DatesContext = createContext();

const DatesContextProvider = props => {

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), props.state );

    const actions = createActions( { dispatch, actionTypes, customization } );

    // useEffect( () => console.log( 'Has rendered. ', 'DatesContext' ) );

    return (
        <DatesContext.Provider value={{ state, dispatch, actions, customization }}>
            {props.children}
        </DatesContext.Provider>
    )
}

export { DatesContext, DatesContextProvider };