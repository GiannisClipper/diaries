const appSchema = () => ( {

    signin: signinSchema(),

    settings: settingsSchema(),

    users: [],

    diaries: [ diarySchema() ],

    payments: {
        genres: [],
        funds: [],
    },

    _uiux: {
        users: { process: { isRequestBefore: true }, },  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
        diaries: {},
        payments: {
            genres: { process: { isRequestBefore: true }, },  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
            funds: { process: { isRequestBefore: true }, },  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
        },
        _error: {},
    },
} );

const signinSchema = () => ( {
    username: '',
    password: '',
    _uiux: {
        process: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
    },
    ...JSON.parse( localStorage.getItem( 'signin' ) || '{}' ),
} );

const settingsSchema = () => ( {
    theme: null,
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isUpdate
        process: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
    },
    ...JSON.parse( localStorage.getItem( 'settings' ) || '{}' ),
} );

const userSchema = () => ( {
    id: null,
    username: '',
    password: '',
    email: '',
    isAdmin: null,
    isUser: null,
    remarks: '',
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isCreate, isUpdate, isDelete
        process: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
    },
} );

const paymentGenreSchema = () => ( {
    id: null,
    name: '',
    code: '',
    isIncoming: null,
    isOutgoing: null,
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isCreate, isUpdate, isDelete
        process: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
    }
} );

const paymentFundSchema = () => ( {
    id: null,
    name: '',
    code: '',
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isCreate, isUpdate, isDelete
        process: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
    }
} );

const diarySchema = () => ( {
    descr: null,
    centralDate: null,
    periods: [],
    _uiux: {
        process: { isInitBefore: true },  // isInitBefore, isInit
        mode: {},  // isInitStart, isInitPrev, isInitNext
    },
} );

const periodSchema = () => ( {
    dates: [],
    _uiux: {
        process: { isRequestBefore: true }, // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
    },
} );

const dateSchema = () => ( {
    date: null,
    entries: [],
    _uiux: {
        isTheCentral: null,
    }
} );

const entrySchema = () => ( {
    id: null,
    date: '',
    type: '',  // 'note', 'payment'
    inSequence: 0,
    _uiux: {
        menu: {},  // isOpen
        form: {},  // isOpen
        type: {},  // isNote, isPayment
        mode: {},  // isCreate, isUpdate, isDelete, isRetrieveMany
        process: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError
    }
} );

const noteSchema = () => ( {
    type: 'note',
    note: '',
} );

const paymentSchema = () => ( {
    type: 'payment',
    genre_name: '',
    incoming: null,
    outgoing: null,
    remark: '',
    fund_name: '',
} );

const reportsSchema = () => ( {
    reports: [],
    _uiux: { 
        process: {},
    },
} );

const reportSchema = () => ( {
    descr: '',
    type: '',
    dateFrom: '',
    dateTill: '',
    _uiux: {
        form: {},  // isOpen
        process: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError
    }
} );


const initSignin = () => ( {
    data: JSON.parse( localStorage.getItem( 'signin' ) || '{}' ),
    uiux: {
        process: {},  // isRequest, isValidation, isValidationOk
    }
} )

const initSettings = () => ( {
    data: JSON.parse( localStorage.getItem( 'settings' ) || '{}' ),
    uiux: {
        form: {},  // isOpen
        mode: {},  // isUpdate
        process: {},  // isRequest, isValidation, isValidationOk
    }
} );

const initState = () => ( {
    data: {
        signin: initSignin(),
        settings: initSettings(),
        users: [],
        dates: [],
        payments: {
            genres: [],
            funds: [],
        },
        reports: [],
    },
    uiux: {
        init: {
            users: { process: { isRequestBefore: true }, },  // process: isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
            dates: { 
                process: { isInitBefore: true },  // isInitBefore, isInit
                mode: {},  // isInitStart, isInitPrev, isInitNext
            },
            payments: {
                genres: { process: { isRequestBefore: true }, },  // process: isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
                funds: { process: { isRequestBefore: true }, },  // process: isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
            },
            reports: { 
                process: {},  // isResponseOk
            },
        },
        error: {}
    }
} );

const initDate = () => ( {
    date: null,
    entries: [],
    _uiux: {
        isTheCentral: null,
    }
} );

const initEntry = () => ( {
    data: {
        id: null,
        date: '',
        type: '',  // 'note', 'payment'
        inSequence: 0,
    },
    uiux: {
        menu: {},  // isOpen
        form: {},  // isOpen
        type: {},  // isNote, isPayment
        mode: {},  // isCreate, isUpdate, isDelete, isRetrieveMany
        process: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError
        dateFrom: null,  // when mode = isRetrieveMany
        dateTill: null,  // when mode = isRetrieveMany
    }
} );

const initNotes = {
    note: () => ( {
        data: {
            type: 'note',
            note: '',
        },
        uiux : {}
    } ),
}

const initPayments = {
    payment: () => ( {
        data: {
            type: 'payment',
            genre_name: '',
            incoming: null,
            outgoing: null,
            remark: '',
            fund_name: '',
        },
        uiux : {}
    } ),

    genre: () => ( {
        data: {
            id: null,
            name: '',
            code: '',
            isIncoming: null,
            isOutgoing: null,
        },
        uiux: {
            form: {},  // isOpen
            mode: {},  // isCreate, isUpdate, isDelete
            process: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
        }
    } ),

    fund: () => ( {
        data: {
            id: null,
            name: '',
            code: '',
        },
        uiux: {
            form: {},  // isOpen
            mode: {},  // isCreate, isUpdate, isDelete
            process: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
        }
    } )
}

const initReport = () => ( {
    data: {
        descr: '',
        type: '',
        dateFrom: '',
        dateTill: '',
    },
    uiux: {
        form: {},  // isOpen
        process: {},  // process: isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError
    }
} );

export { 
    appSchema, 
    signinSchema,
    settingsSchema,
    userSchema,
    paymentGenreSchema,
    paymentFundSchema,
    diarySchema,
    periodSchema, 
    dateSchema,
    entrySchema,
    noteSchema,
    paymentSchema,
    reportsSchema,
    reportSchema,
    initState, initSignin, initSettings, initDate, initEntry, initNotes, initPayments, initReport 
};
