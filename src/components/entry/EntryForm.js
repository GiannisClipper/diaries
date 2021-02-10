import React, { useContext, useState } from 'react';

import { Modal } from '../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputFromList } from '../libs/InputFromList';

import CoreForm from "../core/CoreForm";
import { YYYYMMDDToRepr, dateToYYYYMMDD } from '../core/helpers/dates';
import validators from '../core/assets/validators';
import presetAction from '../core/helpers/presetAction';
import withLexicon from '../core/helpers/withLexicon';

import { EntriesContext } from "./EntriesContext";

import NoteForm from '../note/NoteForm';
import PaymentForm from '../payment/PaymentForm';

function EntryForm( { date, entries, index, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const entry = entries[ index ];

    const [ data, setData ] = useState( { ...entry } );

    const onValidation = 
        data.type === 'note'
            ?
            () => {
                let errors = [];
                const isBlank = withLexicon( validators.isBlank, lexicon );        
                errors.push( isBlank( lexicon.note.note, data.note ) );
                errors = errors.filter( x => x !== null );
                return { data, errors };
            }
        : data.type === 'payment'
            ?
            () => {
                let errors = [];
                const isBlank = withLexicon( validators.isBlank, lexicon );
                errors.push( isBlank( lexicon.payment.genre_name, data.genre_name ) );
                errors.push( isBlank( lexicon.payment.fund_name, data.fund_name ) );
                errors = errors.filter( x => x !== null );
                return { data, errors };
            }
        :
           () => {
                let errors = [];
                const isNotFound = withLexicon( validators.isNotFound, lexicon );        
                errors.push( isNotFound( lexicon.entry.type, [ 'note', 'payment' ], data.type ) );
                errors = errors.filter( x => x !== null );
                return { data, errors };
            };

    return (
        <Modal onClick={ onClickOut } centeredness>
            <CoreForm
                headLabel={ lexicon.entry.entry }
                Context={ EntriesContext }
                assets={ assets }
                lexicon={ lexicon }
                index={ index }
                onValidation={ onValidation }
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
                        { lexicon.entry.date }
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
                        { lexicon.entry.type }
                    </InputLabel>
                    <InputValue>
                        <InputFromList
                            value={ data.type }
                            allValues={ [ 'note', 'payment' ] }
                            onChange={ event => setData( { ...data, type: event.target.value } ) }
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

                : null }

            </CoreForm>
        </Modal>
    );
}

export default EntryForm;
