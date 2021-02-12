import React, { useContext } from 'react';

import { getFromList } from '../core/helpers/getFromList';

import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';

const PaymentRepr = ( { entry, lexicon } ) => {

    const  { genres } = useContext( GenresContext ).state;
    const  { funds } = useContext( FundsContext ).state;

    let { revenue, expense, fund_id, genre_id, remark } = entry;

    const genre_name = genre_id
        ? getFromList( genres, 'id', genre_id ).name
        : '';

    const fund_name = fund_id
        ? getFromList( funds, 'id', fund_id ).name
        : '';

    let repr = '';

    repr += revenue ? `${ lexicon.payment.revenue } ${ fund_name } ${ revenue }, ` : '';
    repr += expense ? `${ lexicon.payment.expense } ${ fund_name } ${ expense }, ` : '';
    repr += `${ genre_name }, `;
    repr += remark ? `${ remark }` : '';

    return <>{ repr }</>
}

export default PaymentRepr;
export { PaymentRepr };