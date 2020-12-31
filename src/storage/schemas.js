const appSchema = () => ( {

    signin: signinSchema(),

    settings: settingsSchema(),

    payments: {
        genres: [],
        funds: [],
    },

    _uiux: {
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

const usersSchema = () => ( {
    users: [],
    _uiux: { 
        process: { isRequestBefore: true },  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
    },
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

const diariesSchema = () => ( {
    diaries: [],
    _uiux: { 
        process: { isRequestBefore: true },  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
    },
} );

const diarySchema = () => ( {
    title: null,
    startDate: null,
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isCreate, isUpdate, isDelete
        process: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
    },
} );

const benchSchema = () => ( {
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
        isStartDate: null,
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

export { 
    appSchema, 
    signinSchema,
    settingsSchema,
    usersSchema,
    userSchema,
    diariesSchema,
    diarySchema,
    benchSchema,
    periodSchema, 
    dateSchema,
    entrySchema,
    noteSchema,
    paymentSchema,
    paymentGenreSchema,
    paymentFundSchema,
    reportsSchema,
    reportSchema, 
};
