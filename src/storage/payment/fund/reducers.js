import { paymentFundSchema } from '../../schemas';
import { parseFundFromDB } from './parsers';

const fundsReducer = ( state, action ) => {

    switch ( action.type ) {

         case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { _uiux } = state;
            _uiux.process = { isRequestBefore: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_REQUEST': {
            const funds = [ paymentFundSchema() ];
            funds[ 0 ]._uiux.mode = { isRetrieveMany: true };
            funds[ 0 ]._uiux.process = { isRequest: true };

            const { _uiux } = state;
            _uiux.process = { isRequest: true };

            return { ...state, funds, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { _uiux } = state;
            _uiux.process = { isResponseWaiting: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            const { dataFromDB } = action.payload;

            const funds = [];
            dataFromDB.forEach( x => funds.push( { ...paymentFundSchema(), ...parseFundFromDB( x ) } ) );
            funds.sort( ( x, y ) => x.code > y.code ? 1 : -1 );
            funds.push( paymentFundSchema() );

            const { _uiux } = state;
            _uiux.process = { isResponseOk: true };

            return { ...state, funds, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const funds = [ paymentFundSchema() ];
            funds[ 0 ]._uiux.process = { isResponseError: true }

            const { _uiux } = state;
            _uiux.process = { isResponseError: true };
            _uiux._error = action.payload.error;

            return { ...state, funds, _uiux };

        } case 'OPEN_FORM': {
            const { index, mode } = action.payload;
            const { funds } = state;
            funds[ index ]._uiux.form = { isOpen: true };
            funds[ index ]._uiux.mode = mode;

            return { ...state, funds };

        } case 'CLOSE_FORM': {
            const { index } = action.payload;
            const { funds } = state;
            funds[ index ]._uiux.process = {};
            funds[ index ]._uiux.form = {};
            funds[ index ]._uiux.mode = {};

            return { ...state, funds };

        } case 'DO_VALIDATION': {
            const { index } = action.payload;
            const { funds } = state;
            funds[ index ]._uiux.process = { isValidation: true };

            return { ...state, funds };

        } case 'VALIDATION_OK': {
            const { index, data } = action.payload;
            const { funds } = state;
            funds[ index ] = { ...funds[ index ], ...data };
            funds[ index ]._uiux.process = { isValidationOk: true };

            return { ...state, funds };

        } case 'VALIDATION_ERROR': {
            const { index } = action.payload;
            const { funds } = state;
            funds[ index ]._uiux.process = {};

            return { ...state, funds };

        } case 'DO_REQUEST': {
            const { index } = action.payload;
            const { funds } = state;
            funds[ index ]._uiux.process = { isRequest: true };

            return { ...state, funds };

        } case 'CREATE_RESPONSE_OK': {
            const { index, dataFromDB } = action.payload;
            const funds = [ ...state.funds ];
            funds[ index ] = { ...funds[ index ], ...parseFundFromDB( dataFromDB ) };
            funds[ index ]._uiux.process = {};
            funds[ index ]._uiux.mode = {};
            funds[ index ]._uiux.form = {};
            funds.sort( ( x, y ) => x.code > y.code ? 1 : -1 );
            funds.push( paymentFundSchema() );

            return { ...state, funds };

        } case 'CREATE_RESPONSE_ERROR': {
            const { index } = action.payload;
            const { funds } = state;
            funds[ index ] = paymentFundSchema();

            return { ...state, funds };

        } case 'UPDATE_RESPONSE_OK': {
            const { index, dataFromDB } = action.payload;
            const funds = [ ...state.funds ];
            funds[ index ] = { ...paymentFundSchema(), ...parseFundFromDB( dataFromDB ) };
            funds[ index ]._uiux.process = {};
            funds[ index ]._uiux.mode = {};
            funds[ index ]._uiux.form = {};
            funds.pop();
            funds.sort( ( x, y ) => x.code > y.code ? 1 : -1 );
            funds.push( paymentFundSchema() );

            return { ...state, funds };

        } case 'UPDATE_RESPONSE_ERROR': {
            const { index, _saved } = action.payload;
            const { funds } = state;
            funds[ index ] = { ...funds[ index ], ..._saved };
            funds[ index ]._uiux.process = {};
            funds[ index ]._uiux.mode = {};
            funds[ index ]._uiux.form = {};

            return { ...state, funds };

        } case 'DELETE_RESPONSE_OK': {
            const { index } = action.payload;
            const funds = [ ...state.funds ];
            funds.splice( index, 1 );

            return { ...state, funds };

        } case 'DELETE_RESPONSE_ERROR': {
            const { index } = action.payload;
            const { funds } = state ;
            funds[ index ]._uiux.process = {};
            funds[ index ]._uiux.mode = {};
            funds[ index ]._uiux.form = {};

            return { ...state, funds };

        } default: {
            throw new Error();
        }
    }
}

export { fundsReducer };