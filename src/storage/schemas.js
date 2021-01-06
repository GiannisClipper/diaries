const appSchema = () => ( {

    signin: signinSchema(),

    settings: settingsSchema(),

    backup: backupSchema(),

    _uiux: {
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
    language: null,
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isUpdate
        process: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
    },
    ...JSON.parse( localStorage.getItem( 'settings' ) || '{}' ),
} );

const backupSchema = () => ( {
    _uiux: {
        form: {},  // isOpen
        process: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
    },
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
    id: null,
    user_id: null,
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
    diary_id: null,
    date: '',
    index: 0,
    type: '',  // 'note', 'payment'
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

const paymentGenresSchema = () => ( {
    genres: [],
    _uiux: { 
        process: { isRequestBefore: true },  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
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
        process: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
    }
} );

const paymentFundsSchema = () => ( {
    funds: [],
    _uiux: { 
        process: { isRequestBefore: true },  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
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
    backupSchema,
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
    paymentGenresSchema,
    paymentGenreSchema,
    paymentFundsSchema,
    paymentFundSchema,
    reportsSchema,
    reportSchema, 
};
