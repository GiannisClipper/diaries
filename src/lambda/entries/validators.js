import { isEmpty, isInvalid } from '../core/validators';

const isEmptyDiary_id = ( { data } ) =>
    isEmpty( { 
        value: data.diary_id, 
        message: 'entries.diary_id'
    } );

const isEmptyType = ( { data } ) =>
    isEmpty( { 
        value: data.type, 
        message: 'entries.type'
    } );

const isInvalidType = ( { data } ) =>
    ! data.type
    ? null
    :
    isInvalid( { 
        value: data.type, 
        values: [ 'note', 'payment', 'workout' ],
        message: 'entries.type'
    } );

const isEmptyNote = ( { data } ) =>
    isEmpty( { 
        value: data.type_specs.note, 
        message: 'entries.note.note'
    } );

const isEmptyPayment_genre_id = ( { data } ) =>
    isEmpty( { 
        value: data.type_specs.genre_id, 
        message: 'entries.payment.genre_id'
    } );

const isEmptyPayment_fund_id = ( { data } ) =>
    isEmpty( { 
        value: data.type_specs.fund_id, 
        message: 'entries.payment.fund_id'
    } );

const isEmptyWorkoutGenre_id = ( { data } ) =>
    isEmpty( { 
        value: data.type_specs.genre_id, 
        message: 'entries.workout.genre_id'
    } );

export { 
    isEmptyDiary_id,
    isEmptyType,
    isInvalidType,
    isEmptyNote,
    isEmptyPayment_genre_id,
    isEmptyPayment_fund_id,
    isEmptyWorkoutGenre_id
};