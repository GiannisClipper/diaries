import presetAction from '../helpers/presetAction';

function validationFeature( { 
    actions,
    assets,
    index,
    data,
    status,
    validationProcess, 
} ) {

    if ( status.isValidation ) {

        const validationOk = presetAction( actions.validationOk, { assets, index } );
        const validationError = presetAction( actions.validationError, { assets, index } );
    
        const errors = validationProcess
            ? validationProcess( { data } )
            : [];

        if ( errors.length === 0 ) {
            validationOk( { data } )

        } else {
            validationError( { errors } );
        }
    }
}

export { validationFeature };