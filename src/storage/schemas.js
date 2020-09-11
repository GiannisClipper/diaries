const initState = {
    data: {
        dates: [],
        paymentGenres: [],
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

const initPaymentGenre = () => ( {
    data: {
        id: null,
        code: '',
        name: '',
        isIncoming: null,
    },
    uiux: {
        db: {
            isOnRequest: false,
        },
    }
} );

export { initState, initDate, initEntry, initPaymentGenre };
