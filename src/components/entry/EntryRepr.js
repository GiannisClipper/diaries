import React from 'react';

const EntryRepr = ( { entry } ) => {

    let { type, note, incoming, outgoing, fund_name, genre_name, remark } = entry;

    let repr = '';

    if ( type === 'note' ) {
        repr += note;

    } else if ( type === 'payment' ) {
        repr += incoming ? `Είσπραξη ${incoming} ` : '';
        repr += outgoing ? `Πληρωμή ${outgoing} ` : '';
        repr += `(${fund_name}) ${genre_name}`;
        repr += remark ? `-${remark}` : '';
    }

    return <>{repr}</>
}

export default EntryRepr;
export { EntryRepr };