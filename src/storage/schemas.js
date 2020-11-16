import { parseSigninFromDB, parseSettingsFromDB } from './parsers';

const initSignin = () => ( {
    data: parseSigninFromDB( JSON.parse( localStorage.getItem( 'signin' ) || '{}' ) ),
    uiux: {
        process: {},  // isOnRequest, isOnValidation, isOnValidationDone
    }
} )

const initSettings = () => ( {
    data: parseSettingsFromDB( JSON.parse( localStorage.getItem( 'settings' ) || '{}' ) ),
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
            users: {},  // isBeforeRequest, isAfterRequest, isDone, isError
            dates: {},  // isBeforeRequest (dateFrom, dateTill), isAfterRequest, isDone, isError
            payments: {
                genres: {},  // isBeforeRequest, isAfterRequest, isDone, isError
                funds: {},  // isBeforeRequest, isAfterRequest, isDone, isError
            },
        }
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
        process: {},  // isOnRequest
        isTheCentral: null,
    }
} );

const initEntry = () => ( {
    data: {
        id: null,
        date: '',
        type: '', // 'note', 'payment'
        inSequence: 0,
    },
    uiux: {
        menu: {},  // isOpen
        form: {},  // isOpen
        type: {},  // isNote, isPayment
        mode: {},  // isCreate, isUpdate, isDelete
        process: {},  // isOnRequest
        status: {},  // isSuspended
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
