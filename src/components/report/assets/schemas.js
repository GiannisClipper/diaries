const reportsSchema = () => ( {
    reports: [],
    _uiux: { 
        page: {}, // isOpen
        status: {},
        error: {},
    },
} );

const reportSchema = () => ( {
    descr: '',
    type: '',
    dateFrom: '',
    dateTill: '',
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isRetrieveMany
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError
        error: {},
    }
} );

export { reportsSchema, reportSchema };
