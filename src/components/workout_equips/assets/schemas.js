const equipsSchema = () => ( {
    diary_id: null,
    equips: [],
    _uiux: { 
        page: {}, // isOpen
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
        error: {},
    },
} );

const equipSchema = () => ( {
    id: null,
    diary_id: null,
    name: '',
    code: '',
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isCreate, isUpdate, isDelete
        status: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk, isValidationError
        error: {},
    }
} );

export { equipsSchema, equipSchema };
