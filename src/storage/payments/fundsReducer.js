import { initPayments } from '../schemas';
import { parseFundFromDB } from './parsers';

const fundsReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_FORM': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index, mode } = action.payload;

            funds[ index ].uiux.form = { isOpen: true };
            funds[ index ].uiux.mode = mode;

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'CLOSE_FORM': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index } = action.payload;

            funds[ index ].uiux.process = {};
            funds[ index ].uiux.form = {};
            funds[ index ].uiux.mode = {};

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'DO_VALIDATION': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index } = action.payload;

            funds[ index ].uiux.process = { isValidation: true };

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'VALIDATION_OK': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index, data } = action.payload;

            funds[ index ].uiux.process = { isValidationOk: true };
            funds[ index ].data = { ...data };

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'VALIDATION_ERROR': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index } = action.payload;

            funds[ index ].uiux.process = {};

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'DO_REQUEST': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index } = action.payload;

            funds[ index ].uiux.process = { isRequest: true };

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'CREATE_RESPONSE_OK': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index, dataFromDB } = action.payload;

            funds[ index ].data = parseFundFromDB( dataFromDB );
            funds[ index ].uiux.process = {};
            funds[ index ].uiux.mode = {};
            funds[ index ].uiux.form = {};
            funds.sort( ( x, y ) => x.data.code > y.data.code );
            funds.push( initPayments.fund() );

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'CREATE_RESPONSE_ERROR': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index } = action.payload;

            funds[ index ] = initPayments.fund();

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'UPDATE_RESPONSE_OK': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index, dataFromDB } = action.payload;

            funds[ index ] = initPayments.fund();
            funds[ index ].data = parseFundFromDB( dataFromDB );
            funds[ index ].uiux.process = {};
            funds[ index ].uiux.mode = {};
            funds[ index ].uiux.form = {};
            funds.pop();
            funds.sort( ( x, y ) => x.data.code > y.data.code );
            funds.push( initPayments.fund() );

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'UPDATE_RESPONSE_ERROR': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index, _saved } = action.payload;

            funds[ index ].data = { ..._saved };
            funds[ index ].uiux.process = {};
            funds[ index ].uiux.mode = {};
            funds[ index ].uiux.form = {};

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'DELETE_RESPONSE_OK': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index } = action.payload;

            funds.splice( index, 1 );

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'DELETE_RESPONSE_ERROR': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index } = action.payload;

            funds[ index ].uiux.process = {};
            funds[ index ].uiux.mode = {};
            funds[ index ].uiux.form = {};

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { init } = state.uiux;

            init.payments.funds.process = { isRequestBefore: true };

            return { uiux: { ...state.uiux, init }, data: state.data };

        } case 'RETRIEVE_MANY_REQUEST': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];

            funds = [ initPayments.fund() ];
            funds[ 0 ].uiux.mode = { isRetrieveMany: true };
            funds[ 0 ].uiux.process = { isRequest: true };

            payments = { ...payments, funds };
            const { init } = state.uiux;
            init.payments.funds.process = { isRequest: true };

            return { uiux: { ...state.uiux, init }, data: { ...state.data, payments } };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { init } = state.uiux;
            init.payments.funds.process = { isResponseWaiting: true };

            return { uiux: { ...state.uiux, init }, data: state.data };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            let payments = { ...state.data.payments };
            const { dataFromDB } = action.payload;

            const funds = [];
            dataFromDB.forEach( x=> {
                funds.push( initPayments.fund() );
                funds[ funds.length - 1 ].data = parseFundFromDB( x );
            } );
            funds.sort( ( x, y ) => x.data.code > y.data.code ? 1 : -1 );
            funds.push( initPayments.fund() );
            payments = { ...payments, funds };

            const { init } = state.uiux;
            init.payments.funds.process = { isResponseOk: true };

            return { uiux: { ...state.uiux, init }, data: { ...state.data, payments } };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            let payments = { ...state.data.payments };

            const funds = [];
            const fund = initPayments.fund();
            fund.uiux.process = { isResponseError: true }
            funds.push( fund );
            payments = { ...payments, funds };

            const { init } = state.uiux;
            init.payments.funds.process = { isResponseError: true };
            init.error = action.payload.error;

            return { uiux: { ...state.uiux, init }, data: { ...state.data, payments } };
    
        } default: {
            throw new Error();
        }
    }
}

export default fundsReducer;