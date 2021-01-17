import React from 'react';

const PaymentRepr = ( { entry } ) => {

    let { incoming, outgoing, fund_name, genre_name, remark } = entry;

    let repr = '';

    repr += incoming ? `Είσπραξη ${ incoming } ` : '';
    repr += outgoing ? `Πληρωμή ${ outgoing } ` : '';
    repr += `(${ fund_name }) ${ genre_name }`;
    repr += remark ? `-${ remark }` : '';

    return <>{ repr }</>
}

export default PaymentRepr;
export { PaymentRepr };