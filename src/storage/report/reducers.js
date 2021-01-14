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
        
        } default: {
            return undefined;
        }
    }
}

export { reportsReducer };