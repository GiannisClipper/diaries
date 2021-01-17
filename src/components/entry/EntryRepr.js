import React from 'react';

import NoteRepr from '../note/NoteRepr';
import PaymentRepr from '../payment/PaymentRepr';

const EntryRepr = ( { entry } ) => {

    let { type } = entry;

    return (
        type === 'note'
            ? <NoteRepr entry={ entry } /> :

        type === 'payment'
            ? <PaymentRepr entry={ entry } /> :

        null
    ); 
}

export default EntryRepr;
export { EntryRepr };