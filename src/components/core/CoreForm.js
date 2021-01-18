import React, { useContext, useEffect } from 'react';

import { OkCancelForm } from '../libs/Forms';

import prepayAction from './helpers/prepayAction';

import texts from '../app/assets/texts';

function InputValidation( { 
    status, 
    validators,
    validationOk,
    validationError,
    request,
} ) {

    useEffect( () => {
    
        if ( status.isValidation ) {
            const { data, errors } = validators();

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

function CoreForm( { Context, assets, index, validators, children } ) {

    const { state, actions } = useContext( Context );
    const { namespace } = assets;

    const _item = index !== undefined 
        ? state[ namespace ][ index ]
        : state[ namespace ];

    const { _uiux } = _item;
    const { status, mode } = _uiux;

    const validation = validators ? prepayAction( actions.validation, { assets, index } ) : null;
    const validationOk = validators ? prepayAction( actions.validationOk, { assets, index } ) : null;
    const validationError = validators ? prepayAction( actions.validationError, { assets, index } ) : null;

    const rawRequest = (
        mode.isCreate ?
            actions.createRequest :
        mode.isRetrieve ?
            actions.retrieveRequest :
        mode.isUpdate ?
            actions.updateRequest :
        mode.isDelete ?
            actions.deleteRequest :
        mode.isRetrieveMany ?
            actions.retrieveManyRequest :
        null
    );

    const request = prepayAction( rawRequest, { assets, index } );
    const closeForm = prepayAction( actions.closeForm, { assets, index } );

    const headLabel = texts.heads[ namespace ];

    const okLabel = ( 
        mode.isCreate ?
            texts.buttons.create :
        mode.isUpdate ?
            texts.buttons.update :
        mode.isDelete ?
            texts.buttons.delete :
        mode.isRetrieveMany ?
            texts.buttons.retrieveMany :
        null
    );

    const cancelLabel = texts.buttons.cancel;

    validators = mode.isDelete ? null : validators;
    const onClickOk = validators ? validation : request;

    return (
        <OkCancelForm
            headLabel={ headLabel }
            okLabel={ okLabel }
            cancelLabel={ cancelLabel }
            onClickOk={ onClickOk }
            onClickCancel={ closeForm }
            isRequest={ status.isRequest }
            isDelete={ mode.isDelete }
        >
            <InputValidation
                status={ status }
                validators={ validators }
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