import React, { useContext, useEffect } from 'react';
import { OkCancelForm } from '../libs/Forms';
import texts from '../../storage/texts';

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

    const context = useContext( Context );
    const { state, actions } = context;
    assets = assets || context.assets;
    const { namespace } = assets;

    const _item = index !== undefined 
        ? state[ namespace ][ index ]
        : state[ namespace ];

    const { _uiux } = _item;
    const { status, mode } = _uiux;

    const validation = payload => actions.validation( { ...payload, index, assets } );
    const validationOk = payload => actions.validationOk( { ...payload, index, assets } );
    const validationError = payload => actions.validationError( { ...payload, index, assets } );

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

    const request = payload => rawRequest( { ...payload, index, assets } );
    const closeForm = payload => actions.closeForm( { ...payload, index, assets } );

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