import React from 'react';
import styled from 'styled-components';
import { HeadBox } from './HeadBox';
import { ButtonBox, ButtonLabel, ButtonValue, ButtonValue1, ButtonValue2 } from './ButtonBox';
import { OkButton, CancelButton } from './Buttons';

const Form = styled.div`
    width: 80%;
    padding-top: 0em;
    padding-bottom: 1em;
    overflow: auto;

    ${props => props.theme.FormBox && props.theme.FormBox };
`;

function FormBox( { headLabel, children } ) {

    headLabel = headLabel || '';

    return (
        <Form onClick={event => event.stopPropagation()}>
            <HeadBox>
                {headLabel}
            </HeadBox>
            {children}
        </Form> 
    );
}

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

function CRUDForm( { headLabel, mode, onClickOk, onClickCancel, isOnRequest, children } ) {

    let okLabel, cancelLabel;

    okLabel = 'Επιβεβαίωση';
    cancelLabel = 'Ακύρωση';

    if ( mode.isCreate ) {
        okLabel += ' νέας εγγραφής';

    } else if ( mode.isUpdate ) {
        okLabel += ' τροποποίησης';

    } else if ( mode.isDelete ) {
        okLabel += ' διαγραφής';
    }

    return (
        <OkCancelForm
            headLabel={headLabel}
            okLabel={okLabel}
            cancelLabel={cancelLabel}
            onClickOk={onClickOk}
            onClickCancel={onClickCancel}
            isOnRequest={isOnRequest}
            isDelete={mode.isDelete}
        >
            {children}
        </OkCancelForm>
    );
}

export { FormBox, OkForm, OkCancelForm, CRUDForm };
