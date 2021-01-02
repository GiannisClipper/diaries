import React, { useContext, useEffect } from 'react';
import { CoreContext } from './CoreContext';
import { OkCancelForm } from '../libs/Forms';
import texts from '../../storage/texts';

function InputValidation( { process, validation } ) {

    const { validationOk, validationError, doRequest } = useContext( CoreContext );

    useEffect( () => {
    
        if ( process.isValidation ) {
            const { data, errors } = validation();

            if ( errors === '' ) {
                validationOk( { data } )

            } else {
                alert( errors );
                validationError();
            }

        } else if ( process.isValidationOk ) {
            doRequest();
        }
    } );

    return null;
}

function CoreForm( { headLabel, mode, process, validation, children } ) {

    const { closeForm, doValidation, doRequest } = useContext( CoreContext );

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
            onClickOk={ ! validation || mode.isDelete ? doRequest : doValidation }
            onClickCancel={ closeForm }
            isRequest={ process.isRequest }
            isDelete={ mode.isDelete }
        >
            <InputValidation
                process={ process }
                validation={ validation }
            />

            { children }
        </OkCancelForm>
    );
}

export default CoreForm;
export { InputValidation, CoreForm };