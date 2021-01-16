const reportsSchema = () => ( {
    reports: [],
    _uiux: { 
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
        page: {}, // isOpen
        form: {},  // isOpen
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError
        error: {},
    }
} );

export { reportsSchema, reportSchema };
