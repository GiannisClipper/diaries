import React from 'react';

import NoteRepr from '../note/NoteRepr';
import PaymentRepr from '../payment/PaymentRepr';
import WorkoutRepr from '../workout/WorkoutRepr';

const EntryRepr = ( { entry, lexicon } ) => {

    let { type } = entry;

    return (
        type === 'note'
            ? <NoteRepr entry={ entry } /> :

        type === 'payment'
            ? <PaymentRepr entry={ entry } lexicon={ lexicon } /> :

        type === 'workout'
            ? <WorkoutRepr entry={ entry } lexicon={ lexicon } /> :

        null
    ); 
}

export default EntryRepr;
export { EntryRepr };