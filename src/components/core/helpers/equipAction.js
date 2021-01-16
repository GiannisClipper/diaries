const equipAction = ( action, payload ) => {
    return morePayload => action( { ...morePayload, ...payload } );
}

export default equipAction;
export { equipAction };