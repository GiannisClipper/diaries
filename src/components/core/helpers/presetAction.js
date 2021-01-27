const presetAction = ( action, payload ) => {
    return morePayload => action( { ...morePayload, ...payload } );
}

export default presetAction;
export { presetAction };