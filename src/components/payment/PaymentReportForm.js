import React, { useContext, useEffect } from 'react';

import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputFromListTyping } from '../commons/InputFromList';

import { getFromList } from '../core/helpers/getFromList';

import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';

function PaymentReportForm( { data, setData, lexicon } ) {

    const  { genres } = useContext( GenresContext ).state;
    const  { funds } = useContext( FundsContext ).state;

    const { type_specs } = data;

    if ( type_specs.allGenres === undefined ) {
        type_specs.allGenres = [ ...genres ].reverse();
        type_specs.allGenres = type_specs.allGenres.filter( ( x, i ) => i === 0 || ! type_specs.allGenres[ i - 1 ].code.startsWith( x.code ) );
        type_specs.allGenres = type_specs.allGenres.map( x => x.name ).filter( x => x !== '' );

        type_specs.genre_name = data.genre_id
            ? getFromList( genres, 'id', type_specs.genre_id ).name
            : '';
    }

    if ( type_specs.allFunds === undefined ) {
        type_specs.allFunds = [ ...funds ].reverse();
        type_specs.allFunds = type_specs.allFunds.filter( ( x, i ) => i === 0 || ! type_specs.allFunds[ i - 1 ].code.startsWith( x.code ) );
        type_specs.allFunds = type_specs.allFunds.map( x => x.name ).filter( x => x !== '' );

        type_specs.fund_name = data.fund_id
            ? getFromList( funds, 'id', type_specs.fund_id ).name
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
            <InputLabel title={ `${ type_specs.genre_id }` }>
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
            <InputLabel title={ `${ type_specs.fund_id }` }>
                { lexicon.payment.fund_name }
            </InputLabel>
            <InputValue>
                <InputFromListTyping
                    value={ type_specs.fund_name }
                    allValues={ type_specs.allFunds }
                    onChange={ event => {
                        const fund_name = event.target.value;
                        setData( { ...data, type_specs: { ...type_specs, ...setupFund( fund_name ) } } );
                    } }

                />
            </InputValue>
        </InputBox>
        </>
    );
}

export default PaymentReportForm;
