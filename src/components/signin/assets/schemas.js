const signinSchema = () => ( {
    username: '',
    password: '',
    user_id: null,
    _uiux: {
        status: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk, isValidationError
        error: {},
    },
} );

export { signinSchema };
