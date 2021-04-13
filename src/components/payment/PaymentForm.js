import React, { useContext, useEffect } from 'react';

import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputNumber } from '../commons/InputNumber';
import { InputFromListTyping } from '../commons/InputFromList';

import { getFromList } from '../core/helpers/getFromList';

import { paymentSchema } from './assets/schemas';

import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';

function PaymentForm( { data, setData, lexicon } ) {

    const  { genres } = useContext( GenresContext ).state;
    const  { funds } = useContext( FundsContext ).state;

    const type_specs = data.type_specs || paymentSchema().type_specs;

    if ( type_specs.allGenres === undefined ) {
        type_specs.allGenres = [ ...genres ].reverse();
        type_specs.allGenres = type_specs.allGenres.filter( ( x, i ) => i === 0 || ! type_specs.allGenres[ i - 1 ].code.startsWith( x.code ) );
        type_specs.allGenres = type_specs.allGenres.map( x => x.name ).filter( x => x !== '' );

        type_specs.genre_name = type_specs.genre_id
            ? getFromList( genres, 'id', type_specs.genre_id ).name
            : '';
    }

    if ( type_specs.allFunds === undefined ) {
        type_specs.allFunds = [ ...funds ].reverse();
        type_specs.allFunds = type_specs.allFunds.filter( ( x, i ) => i === 0 || ! type_specs.allFunds[ i - 1 ].code.startsWith( x.code ) );
        type_specs.allFunds = type_specs.allFunds.map( x => x.name ).filter( x => x !== '' );

        type_specs.fund_name = type_specs.fund_id
            ? getFromList( funds, 'id', type_specs.fund_id ).name
            : '';
    }

    const setupGenre = genre_name => {
        let genre_id = null;
        let paymentType = null;
        let revenue = null;
        let expense = null;

        if ( genre_name ) {
            const genre = getFromList( genres, 'name', genre_name );
            genre_id = genre.id;
            paymentType = genre.type;
            revenue = paymentType === 'revenue' ? data.revenue : null;
            expense = paymentType === 'expense' ? data.expense : null;
        }

        return { genre_id, genre_name, paymentType, revenue, expense };
    }

    const setupFund = fund_name => {
        let fund_id = null;

        if ( fund_name ) {
            const fund = getFromList( funds, 'name', fund_name );
            fund_id = fund.id;
        }

        return { fund_id, fund_name };
    }

    return (
        <>
        <InputBox>
            <InputLabel title={ `${ data.genre_id }` }>
                { lexicon.payment.genre_name }
            </InputLabel>
            <InputValue>
                <InputFromListTyping
                    value={ type_specs.genre_name }
                    allValues={ type_specs.allGenres }
                    onChange={ event => {
                        const genre_name = event.target.value;
                        setData( { ...data, type_specs: { ...type_specs, ...setupGenre( genre_name ) } } );
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
                    value={ type_specs.revenue || '' }
                    onChange={ event => setData( { ...data, type_specs: { ...type_specs, revenue: event.target.value } } ) }
                    readOnly={ type_specs.paymentType !== 'revenue' }
                    tabIndex={ type_specs.paymentType !== 'revenue' ? '-1' : null }
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
                    value={ type_specs.expense || '' }
                    onChange={ event => setData( { ...data, type_specs: { ...type_specs, expense: event.target.value } } ) }
                    readOnly={ type_specs.paymentType !== 'expense' }
                    tabIndex={ type_specs.paymentType !== 'expense' ? '-1' : null }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { lexicon.payment.remark }
            </InputLabel>
            <InputValue>
                <input
                    value={ type_specs.remark }
                    onChange={ event => setData( { ...data, type_specs: { ...type_specs, remark: event.target.value } } ) }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel title={ `${ type_specs.fund_id }` }>
                { lexicon.payment.fund_name }
            </InputLabel>
            <InputValue>
                <InputFromListTyping
                    value={ type_specs.fund_name }
                    allValues={ type_specs.allFunds }
                    onChange={ event => {
                        const fund_name = event.target.value;
                        setData( { ...data, fund_name, ...setupFund( fund_name ) } );
                        setData( { ...data, type_specs: { ...type_specs, ...setupFund( fund_name ) } } );
                    } }

                />
            </InputValue>
        </InputBox>
        </>
    );
}

export default PaymentForm;
