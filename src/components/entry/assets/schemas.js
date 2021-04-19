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
    type_specs: {},
    _uiux: {
        menu: {},  // isOpen
        menuOptionCoords: {}, // top, left
        form: {},  // isOpen
        mode: {},  // isCreate, isUpdate, isDelete, isRetrieveMany
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
        copyPaste: {},  // isCutBefore, isCut, isPasteBefore, isPaste
        error: {},
    }
} );

export { entriesSchema, entrySchema };
