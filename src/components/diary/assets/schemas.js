const diariesSchema = () => ( {
    user_id: null,
    diaries: [],
    _uiux: { 
        page: {}, // isOpen
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
        error: {},
    },
} );

const diarySchema = () => ( {
    id: null,
    user_id: null,
    title: null,
    startDate: null,
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isCreate, isUpdate, isDelete
        status: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
        error: {},
    },
} );

export { diariesSchema, diarySchema };