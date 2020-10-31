import React from 'react';
import styled from 'styled-components';
import { ButtonBox, ButtonLabel, ButtonValue, ButtonValue1, ButtonValue2 } from './ButtonBox';
import { OkButton, CancelButton } from './Buttons';

const Form = styled.div`
    width: 80%;
    padding-top: 1em;
    padding-bottom: 1em;

    ${props => props.theme.FormBox && props.theme.FormBox };
`;

function FormBox( { children } ) {
    return (
        <Form>
            {children}
        </Form> 
    );
}

function OkForm( { okLabel, onClickOk, isOnRequest, isDelete, children } ) {
    return (
        <FormBox>
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

function OkCancelForm( { okLabel, cancelLabel, onClickOk, onClickCancel, isOnRequest, isDelete, children } ) {
    return (
        <FormBox>
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

export { FormBox, OkForm, OkCancelForm, CRUDForm };
