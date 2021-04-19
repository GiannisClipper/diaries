import React from 'react';

const PaymentRepr = ( { entry, lexicon } ) => {

    let { revenue, expense, fund_name, genre_name, remark } = entry.type_specs;

    let repr = '';

    repr += revenue ? `${ lexicon.payments.revenue } ${ fund_name } ${ revenue }, ` : '';
    repr += expense ? `${ lexicon.payments.expense } ${ fund_name } ${ expense }, ` : '';
    repr += `${ genre_name }, `;
    repr += remark ? `${ remark }` : '';

    return <>{ repr }</>
}

export default PaymentRepr;
export { PaymentRepr };