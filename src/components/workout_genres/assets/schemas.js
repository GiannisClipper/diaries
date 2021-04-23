const genresSchema = () => ( {
    diary_id: null,
    genres: [],
    _uiux: { 
        page: {}, // isOpen
        status: {},  // isRequestBefore, isRequest, isResponseWaiting, isResponseOk, isResponseError, isSuspended
        error: {},
    },
} );

const genreSchema = () => ( {
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

export { genresSchema, genreSchema };
