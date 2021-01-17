import React, { useState } from 'react';

import { Modal } from '../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputDate } from '../libs/InputDate';

import CoreForm from "../core/CoreForm";
import { isBlank, isFound } from '../core/assets/validators';
import prepayAction from '../core/helpers/prepayAction';

import { DiariesContext } from './DiariesContext';

function DiaryForm( { diaries, index, actions, assets } ) {

    const closeForm = prepayAction( actions.closeForm, { assets, index } );

    const diary = diaries[ index ];

    const [ data, setData ] = useState( { ...diary } );

    const validators = () => {
        let errors = [];

        errors.push( isBlank( 'Κωδικός χρήστη', data.user_id ) );
        errors.push( isBlank( 'Τίτλος', data.title ) );
        errors.push( isFound( 'Τίτλος', diaries.map( x=> x.title ), data.title, index ) );

        errors = errors.filter( x => x !== null );

        return { data, errors };
    }

    return (
        <Modal onClick={ closeForm } centeredness>

            <CoreForm
                Context={ DiariesContext }
                assets={ assets }
                index={ index }
                validators={ validators }
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
