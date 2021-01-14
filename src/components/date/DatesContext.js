import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { datesSchema } from '../../storage/schemas';

import comboReducer from '../../helpers/comboReducer';
import { datesReducer } from '../../storage/date/reducers';
import { retrieveManyReducer } from '../../storage/core/reducers/retrieve';

import retrieveManyActionTypes from '../../storage/core/actions/retrieveMany';

import { AppContext } from '../app/AppContext';
import createActions from '../../helpers/createActions';

const reducers = [ 
    datesReducer,
    retrieveManyReducer
];

const assets = {
    namespace: 'dates',
};

const actionTypes = {
    ...retrieveManyActionTypes
};

const DatesContext = createContext();

const DatesContextProvider = props => {

    const schema = { ...datesSchema(), ...props.state };

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), schema );

    const actions = createActions( { dispatch, actionTypes, assets } );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    // useEffect( () => console.log( 'Has rendered. ', 'DatesContext' ) );

    return (
        <DatesContext.Provider value={{ state, dispatch, actions, assets }}>
            {props.children}
        </DatesContext.Provider>
    )
}

export { DatesContext, DatesContextProvider };