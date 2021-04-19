const usersSchema = () => ( {
    users: [],
    _uiux: { 
        page: {}, // isOpen
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
        error: {},
    },
} );

const userSchema = () => ( {
    id: null,
    username: '',
    password: '',
    email: '',
    type: '',  // admin, user
    remark: '',
    theme: null,
    language: null,
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isCreate, isUpdate, isDelete
        status: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
        error: {},
    },
} );

export { usersSchema, userSchema };
