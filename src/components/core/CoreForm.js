import React, { useContext, useEffect } from 'react';

import { OkCancelForm } from '../libs/Forms';

import presetAction from './helpers/presetAction';

function InputValidation( { 
    status, 
    onValidation,
    validationOk,
    validationError,
    request,
} ) {

    useEffect( () => {
    
        if ( status.isValidation ) {
            const { data, errors } = onValidation();

            if ( errors.length === 0 ) {
                validationOk( { data } )

            } else {
                alert( errors.join( '\n' ) );
                validationError();
            }

        } else if ( status.isValidationOk ) {
            request();
        }
    } );

    return null;
}

function CoreForm( { headLabel, Context, assets, lexicon, index, onValidation, children } ) {

    const { state, actions } = useContext( Context );
    const { namespace } = assets;

    const _item = index !== undefined 
        ? state[ namespace ][ index ]
        : state[ namespace ];

    const { _uiux } = _item;
    const { status, mode } = _uiux;

    const okLabel = ( 
        mode.isCreate ? lexicon.core.create :
        mode.isRetrieve ? lexicon.core.retrieve :
        mode.isRetrieveMany ? lexicon.core.retrieve :
        mode.isUpdate ? lexicon.core.update :
        mode.isDelete ? lexicon.core.delete :
        null
    );

    const cancelLabel = lexicon.core.cancel;

    const validation = onValidation ? presetAction( actions.validation, { assets, index } ) : null;
    const validationOk = onValidation ? presetAction( actions.validationOk, { assets, index } ) : null;
    const validationError = onValidation ? presetAction( actions.validationError, { assets, index } ) : null;

    const rawRequest = (
        mode.isCreate ? actions.createRequest :
        mode.isRetrieve ? actions.retrieveRequest :
        mode.isRetrieveMany ? actions.retrieveManyRequest :
        mode.isUpdate ? actions.updateRequest :
        mode.isDelete ? actions.deleteRequest :
        null
    );

    const request = presetAction( rawRequest, { assets, index } );

    onValidation = mode.isDelete ? null : onValidation;
    const onClickOk = onValidation ? validation : request;

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickCancel = () => { closeForm(); noMode(); };

    return (
        <OkCancelForm
            headLabel={ headLabel }
            okLabel={ okLabel }
            cancelLabel={ cancelLabel }
            onClickOk={ onClickOk }
            onClickCancel={ onClickCancel }
            isRequest={ status.isRequest }
            isDelete={ mode.isDelete }
        >
            <InputValidation
                status={ status }
                onValidation={ onValidation }
                validationOk={ validationOk }
                validationError={ validationError }
                request={ request }
            />

            { children }
        </OkCancelForm>
    );
}

export default CoreForm;
export { InputValidation, CoreForm };