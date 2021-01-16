const prepayAction = ( action, payload ) => {
    return morePayload => action( { ...morePayload, ...payload } );
}

export default prepayAction;
export { prepayAction };