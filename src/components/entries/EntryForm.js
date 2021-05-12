import React, { useState, useEffect } from 'react';
import { setDateRepr } from '@giannisclipper/date'; 

import { Modal } from '../commons/Modal';
import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputSelectingList } from '../commons/InputList';

import CoreForm from "../core/CoreForm";
import { getFromList } from '../core/helpers/getFromList';
import presetAction from '../core/helpers/presetAction';
import { validationFeature } from "../core/features/validation";

import {
    isEmptyDiary_id,
    isEmptyDate,
    isInvalidDate,
    isEmptyType,
    isInvalidType,
    isEmptyNote,
    isEmptyPayment_genre_id,
    isEmptyPayment_fund_id,
    isEmptyWorkoutGenre_id
} from './assets/validators';

import { EntriesContext } from "./EntriesContext";

import NoteForm from '../notes/NoteForm';
import PaymentForm from '../payments/PaymentForm';
import WorkoutForm from '../workouts/WorkoutForm';

function EntryForm( { date, entries, index, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const entry = entries[ index ];

    const [ data, setData ] = useState( { ...entry } );
    const { status } = entry._uiux;

    const types = [
        { type: 'note', descr: lexicon.entries.types.note },
        { type: 'payment', descr: lexicon.entries.types.payment },
        { type: 'workout', descr: lexicon.entries.types.workout },
    ];


    useEffect( () => {
        validationFeature( { 
            actions,
            assets,
            index,
            data,
            status,
            validationProcess: ( { data } ) => {
                const errors = [];
                errors.push( isEmptyDiary_id( { data } ) );
                errors.push( isEmptyDate( { data } ) );
                errors.push( isInvalidDate( { data } ) );
                errors.push( isEmptyType( { data } ) );
                errors.push( isInvalidType( { data } ) );
            
                if ( data.type === 'note' ) {
                    errors.push( isEmptyNote( { data } ) );
            
                } if ( data.type === 'payment' ) {
                    errors.push( isEmptyPayment_genre_id( { data } ) );
                    errors.push( isEmptyPayment_fund_id( { data } ) );
            
                } if ( data.type === 'workout' ) {
                    errors.push( isEmptyWorkoutGenre_id( { data } ) );
                }
            
                return errors.filter( x => x !== null );
            }, 
        } );
    } );

    return (
        <Modal onClick={ onClickOut } centeredness>
            <CoreForm
                headLabel={ lexicon.entries.entry }
                Context={ EntriesContext }
                assets={ assets }
                lexicon={ lexicon }
                index={ index }
            >
                {/* <InputBox>
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
                </InputBox> */}

                <InputBox>
                    <InputLabel>
                        { lexicon.entries.date }
                    </InputLabel>
                    <InputValue>
                        <input 
                            value={ `${ lexicon.core.days[ date.getDay() ] } ${ setDateRepr( date ) }` }
                            tabIndex="-1"
                            readOnly
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        { lexicon.entries.type }
                    </InputLabel>
                    <InputValue>
                        <InputSelectingList
                            value={ getFromList( types, 'type', data.type ).descr }
                            values={ types.map( x => x.descr ) }
                            onChange={ event => {
                                const type = getFromList( types, 'descr', event.target.value ).type
                                if ( data.type !== type ) {
                                    setData( { ...data, type, type_specs: {} } );
                                } 
                            } }
                        />
                    </InputValue>
                </InputBox>

                { data.type === 'note' ?
                    <NoteForm 
                        data={ data } 
                        setData={ setData } 
                        lexicon={ lexicon } 
                    />

                : data.type === 'payment' ?
                    <PaymentForm 
                        data={ data } 
                        setData={ setData } 
                        lexicon={ lexicon } 
                    />

                : data.type === 'workout' ?
                    <WorkoutForm 
                        data={ data } 
                        setData={ setData } 
                        lexicon={ lexicon } 
                    />

                : null }

            </CoreForm>
        </Modal>
    );
}

export default EntryForm;
