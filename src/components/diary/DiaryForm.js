import React, { useState } from 'react';

import { Modal } from '../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputDate } from '../libs/InputDate';

import CoreForm from "../core/CoreForm";
import { isBlank, isFound } from '../core/assets/validators';
import presetAction from '../core/helpers/presetAction';

import { DiariesContext } from './DiariesContext';

function DiaryForm( { diaries, index, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const diary = diaries[ index ];

    const [ data, setData ] = useState( { ...diary } );

    const validators = () => {
        let errors = [];

        errors.push( isBlank( lexicon.diary.user_id, data.user_id ) );
        errors.push( isBlank( lexicon.diary.title, data.title ) );
        errors.push( isFound( lexicon.diary.title, diaries.map( x=> x.title ), data.title, index ) );

        errors = errors.filter( x => x !== null );

        return { data, errors };
    }

    return (
        <Modal onClick={ onClickOut } centeredness>

            <CoreForm
                headLabel={ lexicon.diary.diary }
                Context={ DiariesContext }
                assets={ assets }
                lexicon={ lexicon }
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
                        { lexicon.diary.title }
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
                        { lexicon.diary.startDate }
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
