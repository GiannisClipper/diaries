import React, { useContext, useEffect } from 'react';

import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputNumber } from '../libs/InputNumber';
import { InputFromList } from '../libs/InputFromList';

import { getFromList } from '../core/helpers/getFromList';

import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';

function PaymentForm( { data, setData, lexicon } ) {

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
        let isRevenue = false;
        let isExpense = false;
        let revenue = null;
        let expense = null;

        if ( name ) {
            const genre = getFromList( genres, 'name', name );
            genre_id = genre.id;
            isRevenue = genre.isRevenue;
            isExpense = genre.isExpense;
            revenue = isRevenue ? data.revenue : null;
            expense = isExpense ? data.expense : null;
        }

        return { genre_id, isRevenue, isExpense, revenue, expense };
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
                { lexicon.payment.genre_name }
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
                { lexicon.payment.revenue }
            </InputLabel>
            <InputValue>
                <InputNumber
                    decimals="2"
                    value={ data.revenue || '' }
                    onChange={ event => setData( { ...data, revenue: event.target.value } ) }
                    readOnly={ ! data.isRevenue }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { lexicon.payment.expense }
            </InputLabel>
            <InputValue>
                <InputNumber
                    decimals="2"
                    value={ data.expense || '' }
                    onChange={ event => setData( { ...data, expense: event.target.value } ) }
                    readOnly={ ! data.isExpense }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { lexicon.payment.remark }
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
                { lexicon.payment.fund_name }
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
