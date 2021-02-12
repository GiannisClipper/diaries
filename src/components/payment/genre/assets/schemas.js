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
    type: '', // revenue, expense
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isCreate, isUpdate, isDelete
        status: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
        error: {},
    }
} );

export { genresSchema, genreSchema };
