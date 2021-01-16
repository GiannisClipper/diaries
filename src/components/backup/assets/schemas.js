const backupSchema = () => ( {
    _uiux: {
        form: {},  // isOpen
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
        error: {},
    },
} );

export { backupSchema };
