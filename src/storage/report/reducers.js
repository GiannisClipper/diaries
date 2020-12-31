import { reportSchema } from '../schemas';

const data = [
    { descr: 'Κατάσταση σημειωμάτων', type: 'note' },
    { descr: 'Κατάσταση οικονομικών κινήσεων', type: 'payment' }
];

const reportsReducer = ( state, action ) => {

    switch ( action.type ) {
        case 'DO_INIT': {
            const { _uiux } = state;
            const reports = data.map( x => ( { ...reportSchema(), ...x } ) );
            _uiux.process = { isResponseOk: true };

            return { ...state, reports, _uiux };
        
        } case 'OPEN_FORM': {
            const { index } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.form = { isOpen: true };

            return { ...state, reports };

        } case 'CLOSE_FORM': {
            const { index } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.form = {};

            return { ...state, reports };

        } case 'DO_VALIDATION': {
            const { index } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.process = { isValidation: true };

            return { ...state, reports };

        } case 'VALIDATION_OK': {
            const { index, data } = action.payload;
            const { reports } = state ;
            reports[ index ] = { ...reports.items[ index ], ...data };
            reports[ index ]._uiux.process = { isValidationOk: true };

            return { ...state, reports };

        } case 'VALIDATION_ERROR': {
            const { index } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.process = {};

            return { ...state, reports };

        } case 'DO_REQUEST': {
            const { index } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.process = { isRequestBefore: true };

            return { ...state, reports };

        } case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { index } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.process = { isRequestBefore: true };

            return { ...state, reports };

        } case 'RETRIEVE_MANY_REQUEST': {
            const { index } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.process = { isRequest: true };

            return { ...state, reports };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { index } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.process = { isResponseWaiting: true };

            return { ...state, reports };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            const { index, dataFromDB } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.process = { isResponseOk: true };

            return { ...state, reports };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const { index, error } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.process = { isResponseError: true };

            return { ...state, reports };

        } default: {
            throw new Error();
        }
    }
}

export { reportsReducer };