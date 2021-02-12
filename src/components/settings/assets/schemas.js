const settingsSchema = () => ( {
    theme: null,
    language: null,
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isUpdate
        status: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
        error: {},
    },
} );

export { settingsSchema };
