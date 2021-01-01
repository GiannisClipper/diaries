import React, { useContext, useState, useEffect } from 'react';
import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';
import EntryForm from '../entry/EntryForm';
import { heads } from '../../storage/texts';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputNumber } from '../libs/InputNumber';
import { InputFromList } from '../libs/InputFromList';
import { isBlank } from '../../helpers/validation';
import { getFromList } from '../../helpers/getFromList';

function PaymentForm( { date, entry } ) {

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

    const validation = () => {
        let errors = '';

        errors += isBlank( data.genre_name ) 
            ? 'Η κατηγορία οικονομικής κίνησης δεν μπορεί να είναι κενή.\n' : '';

        errors += isBlank( data.fund_name ) 
            ? 'Το μέσο οικονομικής κίνησης δεν μπορεί να είναι κενό.\n' : '';

        return { data, errors };
    }

    useEffect( () => setData( { ...data, ...setupGenre( data.genre_name ) } ), [] );

    return (
        <EntryForm
            headLabel={ heads.payments }
            validation={ validation }
            date={ date }
            entry={ entry }
        >
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

        </EntryForm>
    );
}

export default PaymentForm;
