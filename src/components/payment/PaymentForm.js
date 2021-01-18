import React, { useContext, useEffect } from 'react';

import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputNumber } from '../libs/InputNumber';
import { InputFromList } from '../libs/InputFromList';

import { getFromList } from '../core/helpers/getFromList';

import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';

function PaymentForm( { data, setData } ) {

    const  { genres } = useContext( GenresContext ).state;

    const  { funds } = useContext( FundsContext ).state;

    if ( data.allGenres === undefined ) {
        let allGenres = [ ...genres ].reverse();
        allGenres = allGenres.filter( ( x, i ) => i === 0 || ! allGenres[ i - 1 ].code.startsWith( x.code ) );
        allGenres = allGenres.map( x => x.name ).filter( x => x !== '' );
        data.allGenres = allGenres;

        data.genre_name = data.genre_id
            ? getFromList( genres, 'id', data.genre_id ).name
            : '';
    }

    if ( data.allFunds === undefined ) {
        let allFunds = [ ...funds ].reverse();
        allFunds = allFunds.filter( ( x, i ) => i === 0 || ! allFunds[ i - 1 ].code.startsWith( x.code ) );
        allFunds = allFunds.map( x => x.name ).filter( x => x !== '' );
        data.allFunds = allFunds;

        data.fund_name = data.fund_id
            ? getFromList( funds, 'id', data.fund_id ).name
            : '';
    }

    const setupGenre = name => {
        let genre_id = null;
        let isIncoming = false;
        let isOutgoing = false;
        let incoming = null;
        let outgoing = null;

        if ( name ) {
            const genre = getFromList( genres, 'name', name );
            genre_id = genre.id;
            isIncoming = genre.isIncoming;
            isOutgoing = genre.isOutgoing;
            incoming = isIncoming ? data.incoming : null;
            outgoing = isOutgoing ? data.outgoing : null;
        }

        return { genre_id, isIncoming, isOutgoing, incoming, outgoing };
    }

    const setupFund = name => {
        let fund_id = null;

        if ( name ) {
            const fund = getFromList( funds, 'name', name );
            fund_id = fund.id;
        }

        return { fund_id };
    }

    return (
        <>
        <InputBox>
            <InputLabel title={ `${ data.genre_id }` }>
                Κατηγορία
            </InputLabel>
            <InputValue>
                <InputFromList
                    value={ data.genre_name }
                    allValues={ data.allGenres }
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
                    readOnly={ ! data.isIncoming }
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
                    readOnly={ ! data.isOutgoing }
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
            <InputLabel title={ `${ data.fund_id }` }>
                Μέσο πληρωμής
            </InputLabel>
            <InputValue>
                <InputFromList
                    value={ data.fund_name }
                    allValues={ data.allFunds }
                    onChange={ event => {
                        const fund_name = event.target.value;
                        setData( { ...data, fund_name, ...setupFund( fund_name ) } );
                    } }

                />
            </InputValue>
        </InputBox>
        </>
    );
}

export default PaymentForm;
