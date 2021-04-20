import React, { useState } from 'react';

import { Modal } from '../commons/Modal';
import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputSelectingList } from '../commons/InputList';

import CoreForm from "../core/CoreForm";
import { YYYYMMDDToRepr, dateToYYYYMMDD } from '../core/helpers/dates';
import validators from '../core/assets/validators';
import presetAction from '../core/helpers/presetAction';
import withLexicon from '../core/helpers/withLexicon';
import { getFromList } from '../core/helpers/getFromList';

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

    const types = [
        { type: 'note', descr: lexicon.entries.types.note },
        { type: 'payment', descr: lexicon.entries.types.payment },
        { type: 'workout', descr: lexicon.entries.types.workout },
    ];

    const onValidation = 
        data.type === 'note'
            ?
            () => {
                let errors = [];
                // const isBlank = withLexicon( validators.isBlank, lexicon );        
                // errors.push( isBlank( lexicon.notes.note, data.type_specs.note ) );
                // errors = errors.filter( x => x !== null );
                return { data, errors };
            }
        : data.type === 'payment'
            ?
            () => {
                let errors = [];
                // const isBlank = withLexicon( validators.isBlank, lexicon );
                // errors.push( isBlank( lexicon.payments.genre_name, data.type_specs.genre_name ) );
                // errors.push( isBlank( lexicon.payments.fund_name, data.type_specs.fund_name ) );
                // errors = errors.filter( x => x !== null );
                return { data, errors };
            }
        : data.type === 'workout'
            ?
            () => {
                let errors = [];
                // const isBlank = withLexicon( validators.isBlank, lexicon );
                // errors.push( isBlank( lexicon.workouts.genre_name, data.type_specs.genre_name ) );
                // errors = errors.filter( x => x !== null );
                return { data, errors };
            }
        :
           () => {
                let errors = [];
                // const isNotFound = withLexicon( validators.isNotFound, lexicon );        
                // errors.push( isNotFound( lexicon.entries.type, [ 'note', 'payment', 'workout' ], data.type ) );
                // errors = errors.filter( x => x !== null );
                return { data, errors };
            };

    return (
        <Modal onClick={ onClickOut } centeredness>
            <CoreForm
                headLabel={ lexicon.entries.entry }
                Context={ EntriesContext }
                assets={ assets }
                lexicon={ lexicon }
                index={ index }
                onValidation={ onValidation }
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
                            value={ `${ lexicon.core.days[ date.getDay() ] } ${ YYYYMMDDToRepr( dateToYYYYMMDD( date ), 'D-M-Y' ) }` }
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
