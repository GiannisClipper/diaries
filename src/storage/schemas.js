const initSignin = () => ( {
    data: {
        username: '',
        token: localStorage.getItem( 'token' ),
    },
    uiux: {
        process: {},  // isOnRequest, isOnValidation, isOnValidationDone
    }
})

const initState = {
    data: {
        signin: initSignin(),
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
};

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

export { initState, initSignin, initUser, initDate, initEntry, initNotes, initPayments };
