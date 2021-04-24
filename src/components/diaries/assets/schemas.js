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
    title: '',
    startDate: null,
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isCreate, isUpdate, isDelete
        status: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk, isValidationError
        error: {},
    },
} );

export { diariesSchema, diarySchema };
