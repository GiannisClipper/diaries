import React from 'react';

import NoteRepr from '../note/NoteRepr';
import PaymentRepr from '../payment/PaymentRepr';

const EntryRepr = ( { entry, lexicon } ) => {

    let { type } = entry;

    return (
        type === 'note'
            ? <NoteRepr entry={ entry } /> :

        type === 'payment'
            ? <PaymentRepr entry={ entry } lexicon={ lexicon } /> :

        null
    ); 
}

export default EntryRepr;
export { EntryRepr };