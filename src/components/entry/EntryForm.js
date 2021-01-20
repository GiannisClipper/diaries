import React, { useState } from 'react';

import { Modal } from '../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputFromList } from '../libs/InputFromList';

import CoreForm from "../core/CoreForm";
import { dayNames, YYYYMMDDToRepr, dateToYYYYMMDD } from '../core/helpers/dates';
import { isBlank, isNotFound } from '../core/assets/validators';
import prepayAction from '../core/helpers/prepayAction';

import { EntriesContext } from "./EntriesContext";

import NoteForm from '../note/NoteForm';
import PaymentForm from '../payment/PaymentForm';

function EntryForm( { date, entries, index, actions, assets } ) {

    const closeForm = prepayAction( actions.closeForm, { assets, index } );
    const noMode = prepayAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const entry = entries[ index ];

    const [ data, setData ] = useState( { ...entry } );

    const validators = 
        data.type === 'note'
            ?
            () => {
                let errors = [];
                errors.push( isBlank( 'Σημείωμα', data.note ) );
                errors = errors.filter( x => x !== null );
                return { data, errors };
            }
        : data.type === 'payment' 
            ?
            () => {
                let errors = [];
                errors.push( isBlank( 'Κατηγορία', data.genre_name ) );
                errors.push( isBlank( 'Μέσο', data.fund_name ) );
                errors = errors.filter( x => x !== null );
                return { data, errors };
            }
        :
           () => {
                let errors = [];
                errors.push( isNotFound( 'Τύπος', [ 'note', 'payment' ], data.type ) );
                errors = errors.filter( x => x !== null );
                return { data, errors };
            };

    return (
        <Modal onClick={ onClickOut } centeredness>
            <CoreForm
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
                        Ημ/νία
                    </InputLabel>
                    <InputValue>
                        <input 
                            value={ `${dayNames[ date.getDay() ]} ${YYYYMMDDToRepr( dateToYYYYMMDD( date ), 'D-M-Y' )}` }
                            tabIndex="-1"
                            readOnly
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Εγγραφή
                    </InputLabel>
                    <InputValue>
                        <InputFromList
                            value={ data.type }
                            allValues={ [ 'note', 'payment' ] }
                            onChange={ event => setData( { ...data, type: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

                {
                data.type === 'note'
                    ? <NoteForm data={ data } setData={ setData } /> :
                data.type === 'payment' 
                    ? <PaymentForm data={ data } setData={ setData } /> :
                null 
                }

            </CoreForm>
        </Modal>
    );
}

export default EntryForm;
