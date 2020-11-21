const action = ( { dispatch, namespace, type, payload } ) => {

    return ( payload2 ) => dispatch( { namespace, type, payload: { ...payload, ...payload2 } } );
}

export default { action };
export { action };
