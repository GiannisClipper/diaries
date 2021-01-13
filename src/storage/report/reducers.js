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
            _uiux.status = { isResponseOk: true };

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
            reports[ index ]._uiux.status = { isValidation: true };

            return { ...state, reports };

        } case 'VALIDATION_OK': {
            const { index, data } = action.payload;
            const { reports } = state ;
            reports[ index ] = { ...reports.items[ index ], ...data };
            reports[ index ]._uiux.status = { isValidationOk: true };

            return { ...state, reports };

        } case 'VALIDATION_ERROR': {
            const { index } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.status = {};

            return { ...state, reports };

        } case 'DO_REQUEST': {
            const { index } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.status = { isRequestBefore: true };

            return { ...state, reports };

        } case 'RETRIEVE_MANY_REQUEST_BEFORE': {
            const { index } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.status = { isRequestBefore: true };

            return { ...state, reports };

        } case 'RETRIEVE_MANY_REQUEST': {
            const { index } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.status = { isRequest: true };

            return { ...state, reports };

        } case 'RETRIEVE_MANY_RESPONSE_WAITING': {
            const { index } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.status = { isResponseWaiting: true };

            return { ...state, reports };

        } case 'RETRIEVE_MANY_RESPONSE_OK': {
            const { index, dataFromDB } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.status = { isResponseOk: true };

            return { ...state, reports };

        } case 'RETRIEVE_MANY_RESPONSE_ERROR': {
            const { index, error } = action.payload;
            const { reports } = state ;
            reports[ index ]._uiux.status = { isResponseError: true };

            return { ...state, reports };

        } default: {
            throw new Error();
        }
    }
}

export { reportsReducer };