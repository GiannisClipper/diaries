const appSchema = () => ( {
    signin: {},
    settings: {},
    backup: {},
    _uiux: {
        error: {},
    },
} );

const signinSchema = () => ( {
    username: '',
    password: '',
    user_id: null,
    _uiux: {
        status: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
        error: {},
    },
} );

const settingsSchema = () => ( {
    theme: null,
    language: null,
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isUpdate
        status: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
        error: {},
    },
} );

const backupSchema = () => ( {
    _uiux: {
        form: {},  // isOpen
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
        error: {},
    },
} );

const usersSchema = () => ( {
    users: [],
    _uiux: { 
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
        error: {},
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
        status: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
        error: {},
    },
} );

const diariesSchema = () => ( {
    user_id: null,
    diaries: [],
    _uiux: { 
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
        error: {},
    },
} );

const diarySchema = () => ( {
    id: null,
    user_id: null,
    title: null,
    startDate: null,
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isCreate, isUpdate, isDelete
        status: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
        error: {},
    },
} );

const benchSchema = () => ( {
    diary_id: null,
    periods: [],
    _uiux: {
        status: {},  // isInitBefore, isInit
        mode: {},  // isInitStart, isInitPrev, isInitNext
        error: {},
    },
} );

const datesSchema = () => ( {
    dates: [],
    _uiux: {
        status: {}, // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
        error: {},
    },
} );

const entriesSchema = () => ( {
    date: null,
    entries: [],
    _uiux: {
        isStartDate: null,
    }
} );

const entrySchema = () => ( {
    id: null,
    diary_id: null,
    date: '',
    index: 0,
    type: '',  // 'note', 'payment'
    _uiux: {
        menu: {},  // isOpen
        form: {},  // isOpen
        type: {},  // isNote, isPayment
        mode: {},  // isCreate, isUpdate, isDelete, isRetrieveMany
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError
        error: {},
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

const paymentGenresSchema = () => ( {
    diary_id: null,
    genres: [],
    _uiux: { 
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
        error: {},
    },
} );

const paymentGenreSchema = () => ( {
    id: null,
    diary_id: null,
    name: '',
    code: '',
    isIncoming: null,
    isOutgoing: null,
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isCreate, isUpdate, isDelete
        status: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
        error: {},
    }
} );

const paymentFundsSchema = () => ( {
    diary_id: null,
    funds: [],
    _uiux: { 
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
        error: {},
    },
} );

const paymentFundSchema = () => ( {
    id: null,
    diary_id: null,
    name: '',
    code: '',
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isCreate, isUpdate, isDelete
        status: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
    }
} );

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
        form: {},  // isOpen
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError
        error: {},
    }
} );

export { 
    appSchema, 
    signinSchema,
    settingsSchema,
    backupSchema,
    usersSchema,
    userSchema,
    diariesSchema,
    diarySchema,
    benchSchema,
    datesSchema, 
    entriesSchema,
    entrySchema,
    noteSchema,
    paymentSchema,
    paymentGenresSchema,
    paymentGenreSchema,
    paymentFundsSchema,
    paymentFundSchema,
    reportsSchema,
    reportSchema, 
};
