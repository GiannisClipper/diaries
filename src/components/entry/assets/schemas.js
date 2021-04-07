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
    type: '',  // 'note', 'payment', 'workout'
    _uiux: {
        menu: {},  // isOpen
        menuOptionCoords: {}, // top, left
        form: {},  // isOpen
        mode: {},  // isCreate, isUpdate, isDelete, isRetrieveMany
        paste: {},  // isPaste
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError
        error: {},
    }
} );

export { entriesSchema, entrySchema };
