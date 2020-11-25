import React, { useContext, useState, useEffect } from 'react';
import { STATEContext } from '../STATEContext';
import EntryForm from '../EntryForm';
import { heads } from '../../storage/texts';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputNumber } from '../libs/InputNumber';
import { InputFromList } from '../libs/InputFromList';
import { InputValidations } from "../libs/CRUD";
import { isBlank } from '../../helpers/validation';
import { getFromList } from '../../storage/payments/parsers';

function PaymentForm( { date, entry, inSequence, closeForm, doValidation, validationDone, validationError, doRequest } ) {

    const  { state } = useContext( STATEContext );

    let allGenres = [ ...state.data.payments.genres ].reverse();
    allGenres = allGenres.filter( ( x, i ) => i === 0 || !allGenres[ i - 1 ].data.code.startsWith( x.data.code ) );
    allGenres = allGenres.map( x => x.data.name ).filter( x => x !== '' );

    let allFunds = [ ...state.data.payments.funds ].reverse();
    allFunds = allFunds.filter( ( x, i ) => i === 0 || !allFunds[ i - 1 ].data.code.startsWith( x.data.code ) );
    allFunds = allFunds.map( x => x.data.name ).filter( x => x !== '' );

    const [ data, setData ] = useState( { ...entry.data } );

    const setupGenre = name => {
        let isIncoming = false;
        let isOutgoing = false;
        let incoming = null;
        let outgoing = null;

        if ( name ) {
            const genre = getFromList( state.data.payments.genres, 'name', name );
            isIncoming = genre.isIncoming;
            isOutgoing = genre.isOutgoing;
            incoming = isIncoming ? data.incoming : null;
            outgoing = isOutgoing ? data.outgoing : null;
        }
        return { isIncoming, isOutgoing, incoming, outgoing };
    }

    const doValidate = () => {
        let errors = '';
        errors += isBlank( data.genre_name ) ? 'Η κατηγορία οικονομικής κίνησης δεν μπορεί να είναι κενή.\n' : '';
        errors += isBlank( data.fund_name ) ? 'Το μέσο οικονομικής κίνησης δεν μπορεί να είναι κενό.\n' : '';
        return { data, errors };
    }

    useEffect( () => setData( { ...data, ...setupGenre( data.genre_name ) } ), [] );

    return (
        <EntryForm
            headLabel={heads.payments}
            date={date}
            entry={entry}
        >
    
            <InputValidations
                process={entry.uiux.process}
                doValidate={doValidate}
            />

            <InputBox>
                <InputLabel>
                    Κατηγορία
                </InputLabel>
                <InputValue>
                    <InputFromList
                        value={data.genre_name}
                        allValues={allGenres}
                        onChange={event => {
                            const genre_name = event.target.value;
                            setData( { ...data, genre_name, ...setupGenre( genre_name ) } );
                        }}
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
                        value={data.incoming || ''}
                        onChange={event => setData( { ...data, incoming: event.target.value } )}
                        readOnly={!data.isIncoming}
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
                        value={data.outgoing || ''}
                        onChange={event => setData( { ...data, outgoing: event.target.value } )}
                        readOnly={!data.isOutgoing}
                    />
                </InputValue>
            </InputBox>

            <InputBox>
                <InputLabel>
                    Αιτιολογία
                </InputLabel>
                <InputValue>
                    <input
                        value={data.remark}
                        onChange={event => setData( { ...data, remark: event.target.value } )}
                    />
                </InputValue>
            </InputBox>

            <InputBox>
                <InputLabel>
                    Μέσο πληρωμής
                </InputLabel>
                <InputValue>
                    <InputFromList
                        value={data.fund_name}
                        allValues={allFunds}
                        onChange={event => setData( { ...data, fund_name: event.target.value } )}
                    />
                </InputValue>
            </InputBox>

        </EntryForm>
    );
}

export default PaymentForm;
