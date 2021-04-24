import React from 'react';

const PaymentRepr = ( { entry, lexicon } ) => {

    let { revenue, expense, genre_name } = entry.type_specs;

    let repr = '';

    repr += `${ genre_name } `;
    repr += revenue ? `${ revenue } ` : '';
    repr += expense ? `${ expense } ` : '';

    return <>{ repr }</>
}

export default PaymentRepr;
export { PaymentRepr };