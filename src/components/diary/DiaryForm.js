import React, { useState } from 'react';

import { Modal } from '../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputDate } from '../libs/InputDate';

import CoreForm from "../core/CoreForm";
import { isBlank, isFound } from '../core/helpers/validation';
import equipAction from '../core/helpers/equipAction';

import { DiariesContext } from './DiariesContext';

function DiaryForm( { diaries, index, actions, assets } ) {

    const closeForm = equipAction( actions.closeForm, { assets, index } );

    const diary = diaries[ index ];

    const [ data, setData ] = useState( { ...diary } );

    const validationRules = () => {
        let errors = '';

        errors += isBlank( data.user_id ) 
            ? 'Ο Κωδικός χρήστη δεν μπορεί να είναι κενός.\n' : '';

        errors += isBlank( data.title ) 
            ? 'Ο Τίτλος ημερολογίου δεν μπορεί να είναι κενός.\n' : '';
 
        errors += !isBlank( data.title ) && isFound( diaries.map( x=> x.title ), data.title, index ) 
            ? 'Ο Τίτλος ημερολογίου υπάρχει ήδη.\n' : '';
 
        return { data, errors };
    }

    return (
        <Modal onClick={ closeForm } centeredness>

            <CoreForm
                Context={ DiariesContext }
                assets={ assets }
                index={ index }
                validationRules={ validationRules }
            >
                <InputBox>
                    <InputLabel>
                        Id
                    </InputLabel>
                    <InputValue>
                        <input 
                            value={ data.id || '' }
                            tabIndex="-1"
                            readOnly
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Τίτλος ημερολογίου
                    </InputLabel>
                    <InputValue>
                        <input
                            value={ data.title || '' }
                            onChange={ event => setData( { ...data, title: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Ημ/νία εκκίνησης
                    </InputLabel>
                    <InputValue>
                        <InputDate
                            value={ data.startDate }
                            onChange={ event => setData( { ...data, startDate: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

            </CoreForm>
        </Modal>
    );
}

export default DiaryForm;
export { DiaryForm };
