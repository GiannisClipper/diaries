import React, { useContext } from 'react';

import { getFromList } from '../core/helpers/getFromList';

import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';

const PaymentRepr = ( { entry } ) => {

    const  { genres } = useContext( GenresContext ).state;
    const  { funds } = useContext( FundsContext ).state;

    let { incoming, outgoing, fund_id, genre_id, remark } = entry;

    const genre_name = genre_id
        ? getFromList( genres, 'id', genre_id ).name
        : '';

    const fund_name = fund_id
        ? getFromList( funds, 'id', fund_id ).name
        : '';

    let repr = '';

    repr += incoming ? `Είσπραξη ${ fund_name } ${ incoming }, ` : '';
    repr += outgoing ? `Πληρωμή ${ fund_name } ${ outgoing }, ` : '';
    repr += `${ genre_name }, `;
    repr += remark ? `${ remark }` : '';

    return <>{ repr }</>
}

export default PaymentRepr;
export { PaymentRepr };