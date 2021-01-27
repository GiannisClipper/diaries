import React, { createContext, useContext, useReducer, useEffect } from 'react';

import comboReducer from '../core/helpers/comboReducer';
import { datesReducer } from './assets/reducers';
import { retrieveManyReducer } from '../core/assets/reducers/retrieveMany';

import pluginActions from '../core/helpers/pluginActions';
import retrieveManyActions from '../core/assets/actions/retrieveMany';

import { AppContext } from '../app/AppContext';

import { datesSchema } from './assets/schemas';

const reducers = [ 
    datesReducer,
    retrieveManyReducer
];

const rawActions = {
    ...retrieveManyActions
};

const DatesContext = createContext();

const DatesContextProvider = props => {

    const schema = { ...datesSchema(), ...props.state };

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), schema );

    const actions = pluginActions( dispatch, rawActions );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    // useEffect( () => console.log( 'Has rendered. ', 'DatesContext' ) );

    return (
        <DatesContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </DatesContext.Provider>
    )
}

export { DatesContext, DatesContextProvider };