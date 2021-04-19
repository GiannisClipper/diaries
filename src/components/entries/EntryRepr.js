import React from 'react';

import NoteRepr from '../notes/NoteRepr';
import PaymentRepr from '../payments/PaymentRepr';
import WorkoutRepr from '../workouts/WorkoutRepr';

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