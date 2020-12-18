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

const initUser = () => ( {
    data: {
        id: null,
        username: '',
        password: '',
        email: '',
        isAdmin: null,
        isUser: null,
        remarks: '',
    },
    uiux: {
        form: {},  // isOpen
        mode: {},  // isCreate, isUpdate, isDelete
        process: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
    }
} );

const initDate = () => ( {
    data: {
        date: null,
        entries: [],
    },
    uiux: {
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

export { initState, initSignin, initSettings, initUser, initDate, initEntry, initNotes, initPayments, initReport };
