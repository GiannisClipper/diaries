import React, { useContext, useEffect } from 'react';

import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputFromListTyping } from '../libs/InputFromList';

import { getFromList } from '../core/helpers/getFromList';

import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';

function PaymentReportForm( { data, setData, lexicon } ) {

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

    const setupGenre = genre_name => {
        let genre_id = null;

        if ( genre_name ) {
            const genre = getFromList( genres, 'name', genre_name );
            genre_id = genre.id;
        }

        return { genre_name, genre_id };
    }

    const setupFund = fund_name => {
        let fund_id = null;

        if ( fund_name ) {
            const fund = getFromList( funds, 'name', fund_name );
            fund_id = fund.id;
        }

        return { fund_name, fund_id };
    }

    return (
        <>
        <InputBox>
            <InputLabel title={ `${ data.genre_id }` }>
                { lexicon.payment.genre_name }
            </InputLabel>
            <InputValue>
                <InputFromListTyping
                    value={ data.genre_name }
                    allValues={ data.allGenres }
                    onChange={ event => {
                        const genre_name = event.target.value;
                        setData( { ...data, ...setupGenre( genre_name ) } );
                    } }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel title={ `${ data.fund_id }` }>
                { lexicon.payment.fund_name }
            </InputLabel>
            <InputValue>
                <InputFromListTyping
                    value={ data.fund_name }
                    allValues={ data.allFunds }
                    onChange={ event => {
                        const fund_name = event.target.value;
                        setData( { ...data, ...setupFund( fund_name ) } );
                    } }

                />
            </InputValue>
        </InputBox>
        </>
    );
}

export default PaymentReportForm;
