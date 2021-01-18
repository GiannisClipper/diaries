const chargeActions = ( dispatch, rawActions ) => {

    const actions = {};

    Object.keys( rawActions ).forEach( key => 
        actions[ key ] = payload => dispatch( { ...rawActions[ key ], payload } )
    );

    return actions;
}

export default chargeActions;
export { chargeActions };