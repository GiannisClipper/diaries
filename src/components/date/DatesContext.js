import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { datesSchema } from './assets/schemas';

import comboReducer from '../core/helpers/comboReducer';
import { datesReducer } from './assets/reducers';
import { retrieveManyReducer } from '../core/assets/reducers/retrieve';

import chargeActions from '../core/helpers/chargeActions';
import retrieveManyActionTypes from '../core/assets/actions/retrieveMany';

import { AppContext } from '../app/AppContext';

const reducers = [ 
    datesReducer,
    retrieveManyReducer
];

const rawActions = {
    ...retrieveManyActionTypes
};

const DatesContext = createContext();

const DatesContextProvider = props => {

    const schema = { ...datesSchema(), ...props.state };

    const [ state, dispatch ] = useReducer( comboReducer( ...reducers ), schema );

    const actions = chargeActions( { dispatch, rawActions } );
    
    actions.handleError = useContext( AppContext ).actions.handleError;

    // useEffect( () => console.log( 'Has rendered. ', 'DatesContext' ) );

    return (
        <DatesContext.Provider value={ { state, dispatch, actions } }>
            { props.children }
        </DatesContext.Provider>
    )
}

export { DatesContext, DatesContextProvider };