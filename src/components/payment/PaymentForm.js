import React, { useContext } from 'react';

import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputNumber } from '../libs/InputNumber';
import { InputFromList } from '../libs/InputFromList';

import { getFromList } from '../core/helpers/getFromList';

import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';

function PaymentForm( { data, setData } ) {

    const  { genres } = useContext( GenresContext ).state;
    let allGenres = [ ...genres ].reverse();
    allGenres = allGenres.filter( ( x, i ) => i === 0 || !allGenres[ i - 1 ].code.startsWith( x.code ) );
    allGenres = allGenres.map( x => x.name ).filter( x => x !== '' );

    const  { funds } = useContext( FundsContext ).state;
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

    return (
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
    );
}

export default PaymentForm;
