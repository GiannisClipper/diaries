const reportsSchema = () => ( {
    reports: [],
    _uiux: { 
        page: {}, // isOpen
        status: {},
        error: {},
    },
} );

const reportSchema = () => ( {
    diary_id: '',
    descr: '',
    type: '',
    type_specs: {},
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
