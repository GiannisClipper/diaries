import { isEmpty, isInvalid } from '../../core/assets/validators';
import { getDateStr } from '@giannisclipper/date';

const isEmptyDiary_id = ( { data } ) =>
    isEmpty( { 
        value: data.diary_id, 
        message: 'entries.diary_id'
    } );

const isEmptyDate = ( { data } ) =>
    isEmpty( { 
        value: data.date, 
        message: 'entries.date'
    } );

const isInvalidDate = ( { data } ) =>
    ! data.date
    ? null
    :
    isInvalid( { 
        value: data.date, 
        calculation: value => getDateStr( value ) === null ? false : true,
        message: 'entries.date'
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
        message: 'notes.note'
    } );

const isEmptyPayment_genre_id = ( { data } ) =>
    isEmpty( { 
        value: data.type_specs.genre_id, 
        message: 'payments.genre_id'
    } );

const isEmptyPayment_fund_id = ( { data } ) =>
    isEmpty( { 
        value: data.type_specs.fund_id, 
        message: 'payments.fund_id'
    } );

const isEmptyWorkoutGenre_id = ( { data } ) =>
    isEmpty( { 
        value: data.type_specs.genre_id, 
        message: 'workouts.genre_id'
    } );

export { 
    isEmptyDiary_id,
    isEmptyDate,
    isInvalidDate,
    isEmptyType,
    isInvalidType,
    isEmptyNote,
    isEmptyPayment_genre_id,
    isEmptyPayment_fund_id,
    isEmptyWorkoutGenre_id
};