const initSignin = () => ( {
    data: JSON.parse( localStorage.getItem( 'signin' ) || '{}' ),
    uiux: {
        process: {},  // isOnRequest, isOnValidation, isOnValidationDone
    }
} )

const initSettings = () => ( {
    data: JSON.parse( localStorage.getItem( 'settings' ) || '{}' ),
    uiux: {
        form: {},  // isOpen
        mode: {},  // isUpdate
        process: {},  // isOnRequest, isOnValidation, isOnValidationDone
        status: {},  // isSuspended
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
    },
    uiux: {
        init: {
            users: { process: {}, },  // process: isOnRequestBefore, isOnRequest, isOnRequestAfter, isDone, isError, isSuspended
            dates: { 
                process: {},  // isOnInit, isWaiting, isDone
                mode: {},  // isInit, isInitPrev, isInitNext
            },
            payments: {
                genres: { process: {}, },  // process: isOnRequestBefore, isOnRequest, isOnRequestAfter, isDone, isError, isSuspended
                funds: { process: {}, },  // process: isOnRequestBefore, isOnRequest, isOnRequestAfter, isDone, isError, isSuspended
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
        process: {},  // isOnRequest, isOnValidation, isOnValidationDone
        status: {},  // isSuspended
    }
} );

const initDate = () => ( {
    data: {
        date: null,
        entries: [],
    },
    uiux: {
        //process: {},  // isOnRequest
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
        process: {},  // isOnRequest
        status: {},  // isWaiting, isSuspended
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
            process: {},  // isOnRequest, isOnValidation, isOnValidationDone
            status: {},  // isSuspended
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
            process: {},  // isOnRequest, isOnValidation, isOnValidationDone
            status: {},  // isSuspended
        }
    } )
}

export { initState, initSignin, initSettings, initUser, initDate, initEntry, initNotes, initPayments };
