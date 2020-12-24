import { paymentFundSchema } from '../schemas';
import { parseFundFromDB } from './parsers';

const paymentFundsReducer = ( state, action ) => {

    switch ( action.type ) {

         case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { _uiux } = state;
            _uiux.payments.funds.process = { isRequestBefore: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_REQUEST': {
            const funds = [ paymentFundSchema() ];
            funds[ 0 ]._uiux.mode = { isRetrieveMany: true };
            funds[ 0 ]._uiux.process = { isRequest: true };

            const { payments } = state;
            payments.funds = funds;

            const { _uiux } = state;
            _uiux.payments.funds.process = { isRequest: true };

            return { ...state, payments, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { _uiux } = state;
            _uiux.payments.funds.process = { isResponseWaiting: true };

            return { ...state, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            const { dataFromDB } = action.payload;

            const funds = [];
            dataFromDB.forEach( x => funds.push( { ...paymentFundSchema(), ...parseFundFromDB( x ) } ) );
            funds.sort( ( x, y ) => x.code > y.code ? 1 : -1 );
            funds.push( paymentFundSchema() );

            const { payments } = state;
            payments.funds = funds;

            const { _uiux } = state;
            _uiux.payments.funds.process = { isResponseOk: true };

            return { ...state, payments, _uiux };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const funds = [ paymentFundSchema() ];
            funds[ 0 ]._uiux.process = { isResponseError: true }

            const { payments } = state;
            payments.funds = funds;

            const { _uiux } = state;
            _uiux.payments.funds.process = { isResponseError: true };
            _uiux._error = action.payload.error;

            return { ...state, payments, _uiux };

        } default: {
            throw new Error();
        }
    }
}

const paymentFundReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_FORM': {
            const { index, mode } = action.payload;
            const { payments } = state ;
            const { funds } = payments;
            funds[ index ]._uiux.form = { isOpen: true };
            funds[ index ]._uiux.mode = mode;
            payments.funds = funds;

            return { ...state, payments };

        } case 'CLOSE_FORM': {
            const { index } = action.payload;
            const { payments } = state ;
            const { funds } = payments;
            funds[ index ]._uiux.process = {};
            funds[ index ]._uiux.form = {};
            funds[ index ]._uiux.mode = {};
            payments.funds = funds;

            return { ...state, payments };

        } case 'DO_VALIDATION': {
            const { index } = action.payload;
            const { payments } = state ;
            const { funds } = payments;
            funds[ index ]._uiux.process = { isValidation: true };
            payments.funds = funds;

            return { ...state, payments };

        } case 'VALIDATION_OK': {
            const { index, data } = action.payload;
            const { payments } = state ;
            const { funds } = payments;
            funds[ index ] = { ...funds[ index ], ...data };
            funds[ index ]._uiux.process = { isValidationOk: true };
            payments.funds = funds;

            return { ...state, payments };

        } case 'VALIDATION_ERROR': {
            const { index } = action.payload;
            const { payments } = state ;
            const { funds } = payments;
            funds[ index ]._uiux.process = {};
            payments.funds = funds;

            return { ...state, payments };

        } case 'DO_REQUEST': {
            const { index } = action.payload;
            const { payments } = state ;
            const { funds } = payments;
            funds[ index ]._uiux.process = { isRequest: true };
            payments.funds = funds;

            return { ...state, payments };

        } case 'CREATE_RESPONSE_OK': {
            const { index, dataFromDB } = action.payload;
            const funds = [ ...state.payments.funds ];
            funds[ index ] = { ...funds[ index ], ...parseFundFromDB( dataFromDB ) };
            funds[ index ]._uiux.process = {};
            funds[ index ]._uiux.mode = {};
            funds[ index ]._uiux.form = {};
            funds.sort( ( x, y ) => x.code > y.code ? 1 : -1 );
            funds.push( paymentFundSchema() );
            const payments = { ...state.payments, funds };

            return { ...state, payments };

        } case 'CREATE_RESPONSE_ERROR': {
            const { index } = action.payload;
            const { payments } = state ;
            const { funds } = payments;
            funds[ index ] = paymentFundSchema();
            payments.funds = funds;

            return { ...state, payments };

        } case 'UPDATE_RESPONSE_OK': {
            const { index, dataFromDB } = action.payload;
            const funds = [ ...state.payments.funds ];
            funds[ index ] = { ...paymentFundSchema(), ...parseFundFromDB( dataFromDB ) };
            funds[ index ]._uiux.process = {};
            funds[ index ]._uiux.mode = {};
            funds[ index ]._uiux.form = {};
            funds.pop();
            funds.sort( ( x, y ) => x.code > y.code ? 1 : -1 );
            funds.push( paymentFundSchema() );
            const payments = { ...state.payments, funds };

            return { ...state, payments };

        } case 'UPDATE_RESPONSE_ERROR': {
            const { index, _saved } = action.payload;
            const { payments } = state ;
            const { funds } = payments ;
            funds[ index ] = { ...funds[ index ], ..._saved };
            funds[ index ]._uiux.process = {};
            funds[ index ]._uiux.mode = {};
            funds[ index ]._uiux.form = {};
            payments.funds = funds;

            return { ...state, payments };

        } case 'DELETE_RESPONSE_OK': {
            const { index } = action.payload;
            const funds = [ ...state.payments.funds ];
            funds.splice( index, 1 );
            const payments = { ...state.payments, funds };

            return { ...state, payments };

        } case 'DELETE_RESPONSE_ERROR': {
            const { index } = action.payload;
            const { payments } = state ;
            const { funds } = payments ;
            funds[ index ]._uiux.process = {};
            funds[ index ]._uiux.mode = {};
            funds[ index ]._uiux.form = {};
            payments.funds = funds;

            return { ...state, payments };

        } default: {
            throw new Error();
        }
    }
}

export { paymentFundsReducer, paymentFundReducer };