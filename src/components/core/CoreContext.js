import React, { createContext, useCallback, useEffect } from 'react';

const CoreContext = createContext();

const CoreContextProvider = React.memo( ( { actions, dispatch, namespace, payload, children } ) => {

    let types = {};

    Object.keys( actions ).forEach( key => types = { ...types, ...actions[ key ] } );

    actions = {};

    payload = payload || '{}';

    Object.keys( types ).forEach(
        key => actions[ key ] = useCallback( 
            payload2 => dispatch( { namespace, type: types[ key ], payload: { ...payload, ...payload2 } } ),
            [ key ]
        )
    );

    //useEffect( () => console.log( 'Has rendered. ', 'CoreContextProvider' + namespace) );

    return (
        <CoreContext.Provider value={ { ...actions } }>
            { children }
        </CoreContext.Provider>
    )
} );

export { CoreContext, CoreContextProvider };