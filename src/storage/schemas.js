const initState = {
    data: {
        dates: [],
        payments: {
            genres: [],
            funds: [],
        },
    },
    uiux: {
        isInitialized: {},  // genres, funds
    }
};

const initDate = () => ( {
    data: {
        date: null,
        entries: [],
    },
    uiux: {
        process: {
            isOnRequest: false,
            dateFrom: '',
            dateTill: '',
        },
        isTheCentral: null,
    }
} );

const initEntry = () => ( {
    data: {
        id: null,
        date: '',
        note: '',
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

const initPayments = {
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

export { initState, initDate, initEntry, initPayments };
