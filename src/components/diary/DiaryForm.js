import React, { useState, useContext } from 'react';

import { CoreContext } from "../core/CoreContext";
import CoreForm from "../core/CoreForm";

import { DiariesContext } from './DiariesContext';

import { Modal } from '../libs/Modal';
import { heads } from '../../storage/texts';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputDate } from '../libs/InputDate';
import { isBlank, isFound } from '../../helpers/validation';

function DiaryForm( { index } ) {

    const { state } = useContext( DiariesContext );
    const { diaries } = state;
    const diary = diaries[ index ];
    const { _uiux } = diary;

    const { closeForm } = useContext( CoreContext );

    const [ data, setData ] = useState( { ...diary } );

    const validation = () => {
        let errors = '';
 
        errors += isBlank( data.title ) 
            ? 'Ο Τίτλος ημερολογίου δεν μπορεί να είναι κενός.\n' : '';
 
        errors += !isBlank( data.title ) && isFound( diaries.map( x=> x.title ), data.title, index ) 
            ? 'Ο Τίτλος ημερολογίου υπάρχει ήδη.\n' : '';
 
        return { data, errors };
    }

    return (
        <Modal onClick={ closeForm } centeredness>

            <CoreForm
                headLabel={ heads.diaries }
                mode={ _uiux.mode }
                process={ _uiux.process }
                validation={ validation }
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
