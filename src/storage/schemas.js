const initState = {
    data: {
        dates: [],
        payments: {
            genres: [],
            funds: [],
        },
    },
    uiux: {
    }
};

const initDate = () => ( {
    data: {
        date: null,
        entries: [],
    },
    uiux: {
        db: {
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
        db: {},  // isOnRequest
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
            db: {},  // isOnRequest
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
            db: {},  // isOnRequest
        }
    } )
}

export { initState, initDate, initEntry, initPayments };
