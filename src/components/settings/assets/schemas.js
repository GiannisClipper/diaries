const settingsSchema = () => ( {
    theme: 'LIGHT',
    language: 'EN',
    _uiux: {
        form: {},  // isOpen
        mode: {},  // isUpdate
        status: {},  // isRequest, isResponseWaiting, isResponseError, isValidation, isValidationOk
        error: {},
    },
} );

export { settingsSchema };
