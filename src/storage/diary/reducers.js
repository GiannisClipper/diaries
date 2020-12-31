import { diarySchema } from '../schemas';
import { parseDiaryFromDB } from './parsers';

const diariesReducer = ( state, action ) => {

    console.log( action.type )
    switch ( action.type ) {

        case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { _uiux } = state;
            _uiux.process = { isRequestBefore: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_REQUEST': {
            const diaries = [ diarySchema() ];
            diaries[ 0 ]._uiux.mode = { isRetrieveMany: true };
            diaries[ 0 ]._uiux.process = { isRequest: true };

            const { _uiux } = state;
            _uiux.process = { isRequest: true };

            return { ...state, diaries, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { _uiux } = state;
            _uiux.process = { isResponseWaiting: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            const { dataFromDB } = action.payload;

            const diaries = [];
            dataFromDB.forEach( x => diaries.push( { ...diarySchema(), ...parseDiaryFromDB( x ) } ) );
            diaries.sort( ( x, y ) => x.username > y.username ? 1 : -1 );
            diaries.push( diarySchema() );

            const { _uiux } = state;
            _uiux.process = { isResponseOk: true };

            return { ...state, diaries, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const diaries = [ diarySchema() ];
            diaries[ 0 ]._uiux.process = { isResponseError: true }

            const { _uiux } = state;
            _uiux.process = { isResponseError: true };
            _uiux._error = action.payload.error;

            return { ...state, diaries, _uiux };

        } case 'OPEN_FORM': {
            const { index, mode } = action.payload;
            const { diaries } = state ;
            diaries[ index ]._uiux.form = { isOpen: true };
            diaries[ index ]._uiux.mode = mode;

            return { ...state, diaries };

        } case 'CLOSE_FORM': {
            const { index } = action.payload;
            const { diaries } = state ;
            diaries[ index ]._uiux.process = {};
            diaries[ index ]._uiux.form = {};
            diaries[ index ]._uiux.mode = {};

            return { ...state, diaries };

        } case 'DO_VALIDATION': {
            const { index } = action.payload;
            const { diaries } = state ;
            diaries[ index ]._uiux.process = { isValidation: true };

            return { ...state, diaries };

        } case 'VALIDATION_OK': {
            const { index, data } = action.payload;
            const { diaries } = state ;
            diaries[ index ] = { ...diaries[ index ], ...data };
            diaries[ index ]._uiux.process = { isValidationOk: true };

            return { ...state, diaries };

        } case 'VALIDATION_ERROR': {
            const { index } = action.payload;
            const { diaries } = state ;
            diaries[ index ]._uiux.process = {};

            return { ...state, diaries };

        } case 'DO_REQUEST': {
            const { index } = action.payload;
            const { diaries } = state ;
            diaries[ index ]._uiux.process = { isRequest: true };

            return { ...state, diaries };

        } case 'CREATE_RESPONSE_OK': {
            const { index, dataFromDB } = action.payload;
            const diaries = [ ...state.diaries ];
            diaries[ index ] = { ...diaries[ index ], ...parseDiaryFromDB( dataFromDB ) };
            diaries[ index ]._uiux.process = {};
            diaries[ index ]._uiux.mode = {};
            diaries[ index ]._uiux.form = {};
            diaries.sort( ( x, y ) => x.username > y.username ? 1 : -1 );
            diaries.push( diarySchema() );

            return { ...state, diaries };

        } case 'CREATE_RESPONSE_ERROR': {
            const { index } = action.payload;
            const { diaries } = state ;
            diaries[ index ] = diarySchema();

            return { ...state, diaries };

        } case 'UPDATE_RESPONSE_OK': {
            const { index, dataFromDB } = action.payload;
            const diaries = [ ...state.diaries ];
            diaries[ index ] = { ...diarySchema(), ...parseDiaryFromDB( dataFromDB ) };
            diaries[ index ]._uiux.process = {};
            diaries[ index ]._uiux.mode = {};
            diaries[ index ]._uiux.form = {};
            diaries.pop();
            diaries.sort( ( x, y ) => x.username > y.username ? 1 : -1 );
            diaries.push( diarySchema() );

            return { ...state, diaries };

        } case 'UPDATE_RESPONSE_ERROR': {
            const { index, _saved } = action.payload;
            const { diaries } = state ;
            diaries[ index ] = { ...diaries[ index ], ..._saved };
            diaries[ index ]._uiux.process = {};
            diaries[ index ]._uiux.mode = {};
            diaries[ index ]._uiux.form = {};

            return { ...state, diaries };

        } case 'DELETE_RESPONSE_OK': {
            const { index } = action.payload;
            const diaries = [ ...state.diaries ];
            diaries.splice( index, 1 );

            return { ...state, diaries };

        } case 'DELETE_RESPONSE_ERROR': {
            const { index } = action.payload;
            const { diaries } = state ;
            diaries[ index ]._uiux.process = {};
            diaries[ index ]._uiux.mode = {};
            diaries[ index ]._uiux.form = {};

            return { ...state, diaries };

        } default: {
            throw new Error();
        }
    }
}

export { diariesReducer };
