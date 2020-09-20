import { initPayments } from '../schemas';
import { parseFundFromDB } from './parsers';

const fundsReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'INITIALIZE_LIST': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];

            funds = [ initPayments.fund() ];
            funds[ 0 ].uiux.mode = { isRetrieveAll: true };
            funds[ 0 ].uiux.process = { isOnRequest: true };

            payments = { ...payments, funds };
            const { init } = state.uiux;
            init.payments.funds = { isBeforeRequest: true };

            return { uiux: { ...state.uiux, init }, data: { ...state.data, payments } };

        } case 'INITIALIZE_LIST_AFTER_REQUEST': {
            const { init } = state.uiux;
            init.payments.funds = { isAfterRequest: true };

            return { uiux: { ...state.uiux, init }, data: state.data };

        } case 'RETRIEVE_ALL_REQUEST_DONE': {
            let payments = { ...state.data.payments };
            const { dataFromDB } = action.payload;

            const funds = [];
            dataFromDB.forEach( x=> {
                funds.push( initPayments.fund() );
                funds[ funds.length - 1 ].data = parseFundFromDB( x );
            } );
            funds.sort( ( x, y ) => x.data.code > y.data.code );
            funds.push( initPayments.fund() );

            payments = { ...payments, funds };
            const { init } = state.uiux;
            init.payments.funds = { isDone: true };

            return { uiux: { ...state.uiux, init }, data: { ...state.data, payments } };

        } case 'RETRIEVE_ALL_REQUEST_ERROR': {
            let payments = { ...state.data.payments };

            const funds = [];
            const fund = initPayments.fund();
            fund.uiux.status = { isSuspended: true }
            funds.push( fund );

            payments = { ...payments, funds };
            const { init } = state.uiux;
            init.payments.funds = { isError: true };

            return { uiux: { ...state.uiux, init }, data: { ...state.data, payments } };

        } case 'OPEN_FORM': {
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

            funds[ index ].uiux.process = { isOnValidation: true };

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'VALIDATION_DONE': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index } = action.payload;

            funds[ index ].uiux.process = { isOnValidationDone: true };

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

            funds[ index ].uiux.process = { isOnRequest: true };

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'CREATE_REQUEST_DONE': {
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

        } case 'CREATE_REQUEST_ERROR': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index } = action.payload;

            funds[ index ] = initPayments.fund();

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'UPDATE_REQUEST_DONE': {
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

        } case 'UPDATE_REQUEST_ERROR': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index, saved } = action.payload;

            funds[ index ].data = { ...saved.fund.data };
            funds[ index ].uiux.process = {};
            funds[ index ].uiux.mode = {};
            funds[ index ].uiux.form = {};

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'DELETE_REQUEST_DONE': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index } = action.payload;

            funds.splice( index, 1 );

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } case 'DELETE_REQUEST_ERROR': {
            let payments = { ...state.data.payments };
            let funds = [ ...payments.funds ];
            const { index } = action.payload;

            funds[ index ].uiux.process = {};
            funds[ index ].uiux.mode = {};
            funds[ index ].uiux.form = {};

            payments = { ...payments, funds };
            return { ...state, data: { ...state.data, payments } };

        } default: {
            throw new Error();
        }
    }
}

export default fundsReducer;