const createActions = ( { dispatch, actionTypes, customization } ) => {

    const actions = {};

    Object.keys( actionTypes ).forEach( type => 
        actions[ type ] = payload => 
            dispatch( { type: actionTypes[ type ], payload: { ...customization, ...payload } } )
    );

    return actions;
}

export default createActions;
export { createActions };