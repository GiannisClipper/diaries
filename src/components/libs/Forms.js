import React from 'react';
import { FormBox } from './FormBox';
import { ButtonBox, ButtonLabel, ButtonValue, ButtonValue1, ButtonValue2 } from './ButtonBox';
import { OkButton, CancelButton } from './Buttons';

function OkForm( { headLabel, okLabel, onClickOk, isOnRequest, isDelete, children } ) {
    return (
        <FormBox headLabel={headLabel}>
            {children}

            <ButtonBox>
                <ButtonLabel />
                <ButtonValue>
                    <OkButton label={okLabel} onClick={onClickOk} isOnRequest={isOnRequest} isDelete={isDelete} />
                </ButtonValue>
            </ButtonBox>

        </FormBox>
    );
}

function OkCancelForm( { headLabel, okLabel, cancelLabel, onClickOk, onClickCancel, isOnRequest, isDelete, children } ) {
    return (
        <FormBox headLabel={headLabel}>
            {children}

            <ButtonBox>
                <ButtonLabel />
                <ButtonValue>
                    <ButtonValue1>
                        <OkButton label={okLabel} onClick={onClickOk} isOnRequest={isOnRequest} isDelete={isDelete} />
                    </ButtonValue1>
                    <ButtonValue2>
                        <CancelButton label={cancelLabel} onClick={onClickCancel} />
                    </ButtonValue2>
                </ButtonValue>
            </ButtonBox>

        </FormBox>
    );
}

export { OkForm, OkCancelForm };