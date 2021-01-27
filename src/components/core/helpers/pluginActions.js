const pluginActions = ( dispatch, unpluggedActions ) => {

    const actions = {};

    Object.keys( unpluggedActions ).forEach( key => 
        actions[ key ] = payload => dispatch( { ...unpluggedActions[ key ], payload } )
    );

    return actions;
}

export default pluginActions;
export { pluginActions };