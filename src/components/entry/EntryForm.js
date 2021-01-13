import React, { useContext, useState } from 'react';

import { EntriesContext } from "../entry/EntriesContext";
import { Modal } from '../libs/Modal';
import CoreForm from "../core/CoreForm";
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { dayNames, YYYYMMDDToRepr, dateToYYYYMMDD } from '../../helpers/dates';
import { InputFromList } from '../libs/InputFromList';
import { InputNumber } from '../libs/InputNumber';
import { isBlank } from '../../helpers/validation';

import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';
import { getFromList } from '../../helpers/getFromList';

function EntryForm( { date, index } ) {

    const { state, actions } = useContext( EntriesContext );
    const { entries } = state;
    const entry = entries[ index ];

    const closeForm = payload => actions.closeForm( { index, ...payload } );

    const [ data, setData ] = useState( { ...entry } );

    const  { genres } = useContext( GenresContext ).state;
    const  { funds } = useContext( FundsContext ).state;

    let allGenres = [ ...genres ].reverse();
    allGenres = allGenres.filter( ( x, i ) => i === 0 || !allGenres[ i - 1 ].code.startsWith( x.code ) );
    allGenres = allGenres.map( x => x.name ).filter( x => x !== '' );

    let allFunds = [ ...funds ].reverse();
    allFunds = allFunds.filter( ( x, i ) => i === 0 || !allFunds[ i - 1 ].code.startsWith( x.code ) );
    allFunds = allFunds.map( x => x.name ).filter( x => x !== '' );

    const setupGenre = name => {
        let isIncoming = false;
        let isOutgoing = false;
        let incoming = null;
        let outgoing = null;

        if ( name ) {
            const genre = getFromList( genres, 'name', name );
            isIncoming = genre.isIncoming;
            isOutgoing = genre.isOutgoing;
            incoming = isIncoming ? data.incoming : null;
            outgoing = isOutgoing ? data.outgoing : null;
        }
        return { isIncoming, isOutgoing, incoming, outgoing };
    }

    const validationRules = data.type === 'payment' 
        ?
        () => {
            let errors = '';
    
            errors += isBlank( data.genre_name ) 
                ? 'Η Κατηγορία πληρωμής δεν μπορεί να είναι κενή.\n' : '';
    
            errors += isBlank( data.fund_name ) 
                ? 'Το Μέσο πληρωμής δεν μπορεί να είναι κενό.\n' : '';
    
            return { data, errors };
        }
        :
        () => {
            let errors = '';

            errors += isBlank( data.note ) 
                ? 'Το Σημείωμα δεν μπορεί να είναι κενό.\n' : '';
            
            return { data, errors };
        };

    return (
        <Modal onClick={ closeForm } centeredness>
            <CoreForm
                Context={ EntriesContext }
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

                { data.type === 'payment' 
                ? 
                <>
                <InputBox>
                    <InputLabel>
                        Κατηγορία
                    </InputLabel>
                    <InputValue>
                        <InputFromList
                            value={ data.genre_name }
                            allValues={ allGenres }
                            onChange={ event => {
                                const genre_name = event.target.value;
                                setData( { ...data, genre_name, ...setupGenre( genre_name ) } );
                            } }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Είσπραξη
                    </InputLabel>
                    <InputValue>
                        <InputNumber
                            decimals="2"
                            value={ data.incoming || '' }
                            onChange={ event => setData( { ...data, incoming: event.target.value } ) }
                            readOnly={ !data.isIncoming }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Πληρωμή
                    </InputLabel>
                    <InputValue>
                        <InputNumber
                            decimals="2"
                            value={ data.outgoing || '' }
                            onChange={ event => setData( { ...data, outgoing: event.target.value } ) }
                            readOnly={ !data.isOutgoing }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Αιτιολογία
                    </InputLabel>
                    <InputValue>
                        <input
                            value={ data.remark }
                            onChange={ event => setData( { ...data, remark: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Μέσο πληρωμής
                    </InputLabel>
                    <InputValue>
                        <InputFromList
                            value={ data.fund_name }
                            allValues={ allFunds }
                            onChange={ event => setData( { ...data, fund_name: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>
                </>
                :
                <>
                <InputBox>
                    <InputLabel>
                        Σημείωμα
                    </InputLabel>
                    <InputValue>
                        <textarea
                            rows="10"
                            cols="50"
                            maxLength="1000"
                            value={ data.note || '' }
                            onChange={event => setData( { ...data, note: event.target.value } )}
                        />
                    </InputValue>
                </InputBox>
                </>
                }

            </CoreForm>
        </Modal>
    );
}

export default EntryForm;
