const datesSchema = () => ( {
    dates: [],
    _uiux: {
        status: {}, // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
        error: {},
    },
} );

export { datesSchema };
