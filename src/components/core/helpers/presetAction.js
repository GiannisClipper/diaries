const presetAction = ( action, payload ) => {
    return morePayload => action( { ...payload, ...morePayload } );
}

export default presetAction;
export { presetAction };