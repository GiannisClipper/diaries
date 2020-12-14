const reportsReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'OPEN_FORM': {
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

        } case 'RETRIEVE_MANY_TRIGGER': {
            const reports = [ ...state.data.reports ];
            const { index } = action.payload;

            reports[ index ].uiux.process = { isTriggered: true };

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