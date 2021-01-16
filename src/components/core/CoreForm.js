import React, { useContext, useEffect } from 'react';

import { OkCancelForm } from '../libs/Forms';

import equipAction from './helpers/equipAction';

import texts from '../app/assets/texts';

function InputValidation( { 
    status, 
    validationRules,
    validationOk,
    validationError,
    request,     
} ) {

    useEffect( () => {
    
        if ( status.isValidation ) {
            const { data, errors } = validationRules();

            if ( errors === '' ) {
                validationOk( { data } )

            } else {
                alert( errors );
                validationError();
            }

        } else if ( status.isValidationOk ) {
            request();
        }
    } );

    return null;
}

function CoreForm( { Context, assets, index, validationRules, children } ) {

    const { state, actions } = useContext( Context );
    const { namespace } = assets;

    const _item = index !== undefined 
        ? state[ namespace ][ index ]
        : state[ namespace ];

    const { _uiux } = _item;
    const { status, mode } = _uiux;

    const validation = equipAction( actions.validation, { assets, index } );
    const validationOk = equipAction( actions.validationOk, { assets, index } );
    const validationError = equipAction( actions.validationError, { assets, index } );

    const rawRequest = (
        mode.isCreate ?
            actions.createRequest :
        mode.isUpdate ?
            actions.updateRequest :
        mode.isDelete ?
            actions.deleteRequest :
        mode.isRetrieveMany ?
            actions.retrieveManyRequest :
        null
    );

    const request = equipAction( rawRequest, { assets, index } );
    const closeForm = equipAction( actions.closeForm, { assets, index } );

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

    return (
        <OkCancelForm
            headLabel={ headLabel }
            okLabel={ okLabel }
            cancelLabel={ cancelLabel }
            onClickOk={ ! validation || mode.isDelete ? request : validation }
            onClickCancel={ closeForm }
            isRequest={ status.isRequest }
            isDelete={ mode.isDelete }
        >
            <InputValidation
                status={ status }
                validationRules={ validationRules }
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