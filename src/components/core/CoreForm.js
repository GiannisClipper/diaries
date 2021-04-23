import React, { useContext, useEffect } from 'react';

import { OkCancelForm } from '../commons/Forms';
import { ButtonBox, ButtonLabel } from '../commons/ButtonBox';

import presetAction from './helpers/presetAction';
import { parseErrors } from './assets/parsers';
import { ErrorsRepr } from './ErrorsRepr';

function CoreForm( { headLabel, Context, assets, lexicon, index, validationFeature, children } ) {

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

    const validation = presetAction( actions.validation, { assets, index } );
    const onClickOk = validation;

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickCancel = () => { closeForm(); noMode(); };
 
    const errors = 
        ( _uiux.status.isResponseErrorAfter && _uiux.error.statusCode === 422 && _uiux.error.result ) ||
        ( _uiux.status.isValidationError && _uiux.error.result )
            ? parseErrors( { lexicon, errors: _uiux.error.result } )
            : null;

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

            { children }

            { errors
                ? 
                ( 
                <ButtonBox>
                    <ButtonLabel />
                    <ErrorsRepr errors={ errors } />
                </ButtonBox> 
                )
                : 
                null 
            }

        </OkCancelForm>
    );
}

export default CoreForm;
export { CoreForm };