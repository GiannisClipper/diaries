import React from 'react';
import styled from 'styled-components';
import { ButtonsField } from './Field';
import { OkButton, CancelButton } from './Button';

const StyledForm = styled.div`
    width: 80%;
    padding-top: 1em;
    padding-bottom: 1em;
    background-color: transparent;
`;

function Form( { children } ) {
    return (
        <StyledForm>
            {children}
        </StyledForm> 
    );
}

function OkForm( { okLabel, onClickOk, isOnRequest, isDelete, children } ) {
    return (
        <Form>
            {children}

            <ButtonsField>
                <OkButton label={okLabel} onClick={onClickOk} isOnRequest={isOnRequest} isDelete={isDelete} />
            </ButtonsField>

        </Form>
    );
}

function OkCancelForm( { okLabel, cancelLabel, onClickOk, onClickCancel, isOnRequest, isDelete, children } ) {
    return (
        <Form>
            {children}

            <ButtonsField>
                <OkButton label={okLabel} onClick={onClickOk} isOnRequest={isOnRequest} isDelete={isDelete} />
                <CancelButton label={cancelLabel} onClick={onClickCancel} />
            </ButtonsField>

        </Form>
    );
}

function CRUDForm( { mode, onClickOk, onClickCancel, isOnRequest, children } ) {

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

export { Form, OkForm, OkCancelForm, CRUDForm };
