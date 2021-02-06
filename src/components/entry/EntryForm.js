import React, { useContext, useState } from 'react';

import { Modal } from '../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputFromList } from '../libs/InputFromList';

import coreLexicons from '../core/assets/lexicons';
import CoreForm from "../core/CoreForm";
import { YYYYMMDDToRepr, dateToYYYYMMDD } from '../core/helpers/dates';
import { isBlank, isNotFound } from '../core/assets/validators';
import presetAction from '../core/helpers/presetAction';

import { AppContext } from '../app/AppContext';

import lexicons from './assets/lexicons';
import { EntriesContext } from "./EntriesContext";

import noteLexicons from '../note/assets/lexicons';
import NoteForm from '../note/NoteForm';
import paymentLexicons from '../payment/assets/lexicons';
import PaymentForm from '../payment/PaymentForm';

function EntryForm( { date, entries, index, actions, assets } ) {

    const { language } = useContext( AppContext ).state.settings;
    const lexicon = lexicons[ language ] || lexicons.DEFAULT;
    const coreLexicon = coreLexicons[ language ] || coreLexicons.DEFAULT;
    const noteLexicon = noteLexicons[ language ] || noteLexicons.DEFAULT;
    const paymentLexicon = paymentLexicons[ language ] || paymentLexicons.DEFAULT;

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const entry = entries[ index ];

    const [ data, setData ] = useState( { ...entry } );

    const validators = 
        data.type === 'note'
            ?
            () => {
                let errors = [];
                errors.push( isBlank( noteLexicon.note, data.note ) );
                errors = errors.filter( x => x !== null );
                return { data, errors };
            }
        : data.type === 'payment'
            ?
            () => {
                let errors = [];
                errors.push( isBlank( paymentLexicon.genre_name, data.genre_name ) );
                errors.push( isBlank( paymentLexicon.fund_name, data.fund_name ) );
                errors = errors.filter( x => x !== null );
                return { data, errors };
            }
        :
           () => {
                let errors = [];
                errors.push( isNotFound( lexicon.type, [ 'note', 'payment' ], data.type ) );
                errors = errors.filter( x => x !== null );
                return { data, errors };
            };

    return (
        <Modal onClick={ onClickOut } centeredness>
            <CoreForm
                headLabel={ lexicon.entry }
                Context={ EntriesContext }
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
                        { lexicon.date }
                    </InputLabel>
                    <InputValue>
                        <input 
                            value={ `${ coreLexicon.days[ date.getDay() ] } ${ YYYYMMDDToRepr( dateToYYYYMMDD( date ), 'D-M-Y' ) }` }
                            tabIndex="-1"
                            readOnly
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        { lexicon.type }
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
                        lexicon={ noteLexicon } 
                    />

                : data.type === 'payment' ?
                    <PaymentForm 
                        data={ data } 
                        setData={ setData } 
                        lexicon={ paymentLexicon } 
                    />

                : null }

            </CoreForm>
        </Modal>
    );
}

export default EntryForm;
