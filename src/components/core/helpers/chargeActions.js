const chargeActions = ( { dispatch, rawActions } ) => {

    const actions = {};

    Object.keys( rawActions ).forEach( type => 
        actions[ type ] = payload => 
            dispatch( { type: rawActions[ type ], payload } )
    );

    return actions;
}

export default chargeActions;
export { chargeActions };