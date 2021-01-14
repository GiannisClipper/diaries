const createActions = ( { dispatch, actionTypes, assets } ) => {

    const actions = {};

    Object.keys( actionTypes ).forEach( type => 
        actions[ type ] = payload => 
            dispatch( { type: actionTypes[ type ], payload: { assets, ...payload } } )
    );

    return actions;
}

export default createActions;
export { createActions };