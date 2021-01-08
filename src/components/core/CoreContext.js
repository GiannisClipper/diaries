import React, { useContext, createContext, useCallback, useEffect } from 'react';
import { AppContext } from '../app/AppContext';

const CoreContext = createContext();

const CoreContextProvider = React.memo( ( { actions, dispatch, namespace, payload, children } ) => {

    const appDispatch = useContext( AppContext ).dispatch;

    let types = {};

    Object.keys( actions ).forEach( key => types = { ...types, ...actions[ key ] } );

    actions = {};

    payload = payload || '{}';

    Object.keys( types ).forEach( 
        
            key => actions[ key ] = useCallback( ( key !== 'handleError' 

                ? payload2 => dispatch( { namespace, type: types[ key ], payload: { ...payload, ...payload2 } } )

                : error => appDispatch( { type: types[ key ], payload: error } )

            ), [ key ] ) 
    );

    //useEffect( () => console.log( 'Has rendered. ', 'CoreContextProvider' + namespace) );

    return (
        <CoreContext.Provider value={ { ...actions } }>
            { children }
        </CoreContext.Provider>
    )
} );

export { CoreContext, CoreContextProvider };