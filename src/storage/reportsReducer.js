import { initReport } from './schemas';

const reportsReducer = ( state, action ) => {

    switch ( action.type ) {
        case 'DO_INIT': {
            let reports = [
                { descr: 'Κατάσταση σημειωμάτων', type: 'note' },
                { descr: 'Κατάσταση οικονομικών κινήσεων', type: 'payment' },
            ];
            reports = reports.map( x => ( { ...initReport(), data: { ...initReport().data, ...x } } ) );
    
            const { init } = state.uiux;
            init.reports.process = { isDone: true };

            return { data: { ...state.data, reports }, uiux: { ...state.uiux, init } };
        
        } case 'OPEN_FORM': {
            const reports = [ ...state.data.reports ];
            const { index } = action.payload;

            reports[ index ].uiux.form = { isOpen: true };

            return { ...state, data: { ...state.data, reports } };

        } case 'CLOSE_FORM': {
            const reports = [ ...state.data.reports ];
            const { index } = action.payload;

            //reports[ index ].uiux.process = {};
            reports[ index ].uiux.form = {};

            return { ...state, data: { ...state.data, reports } };

        } case 'DO_VALIDATION': {
            const reports = [ ...state.data.reports ];
            const { index } = action.payload;

            reports[ index ].uiux.process = { isOnValidation: true };

            return { ...state, data: { ...state.data, reports } };

        } case 'VALIDATION_DONE': {
            const reports = [ ...state.data.reports ];
            const { index, data } = action.payload;

            reports[ index ].uiux.process = { isOnValidationDone: true };
            reports[ index ].data = { ...data };

            return { ...state, data: { ...state.data, reports } };

        } case 'VALIDATION_ERROR': {
            const reports = [ ...state.data.reports ];
            const { index } = action.payload;

            reports[ index ].uiux.process = {};

            return { ...state, data: { ...state.data, reports } };

        } case 'DO_REQUEST': {
            const reports = [ ...state.data.reports ];
            const { index } = action.payload;

            reports[ index ].uiux.process = { isOnRequestTriggered: true };

            return { ...state, data: { ...state.data, reports } };

        } case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const reports = [ ...state.data.reports ];
            const { index } = action.payload;

            reports[ index ].uiux.process = { isOnRequestBefore: true };

            return { ...state, data: { ...state.data, reports } };

        } case 'RETRIEVE_MANY_REQUEST': {
            const reports = [ ...state.data.reports ];
            const { index } = action.payload;

            reports[ index ].uiux.process = { isOnRequest: true };

            return { ...state, data: { ...state.data, reports } };

        } case 'RETRIEVE_MANY_REQUEST_AFTER': {
            const reports = [ ...state.data.reports ];
            const { index } = action.payload;

            reports[ index ].uiux.process = { isOnRequestAfter: true };

            return { ...state, data: { ...state.data, reports } };

        } case 'RETRIEVE_MANY_REQUEST_DONE': {
            const reports = [ ...state.data.reports ];
            const { index, dataFromDB } = action.payload;

            //alert( dataFromDB )
            reports[ index ].uiux.process = { isDone: true };

            return { ...state, data: { ...state.data, reports } };

        } case 'RETRIEVE_MANY_REQUEST_ERROR': {
            const reports = [ ...state.data.reports ];
            const { index, error } = action.payload;

            //alert( error )
            reports[ index ].uiux.process = { isError: true };

            return { ...state, data: { ...state.data, reports } };

        } default: {
            throw new Error();
        }
    }
}

export default reportsReducer;