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
        mode: {},  // isCreate, isUpdate, isDelete, isRetrieveMany
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError
        error: {},
    }
} );

export { entriesSchema, entrySchema };
