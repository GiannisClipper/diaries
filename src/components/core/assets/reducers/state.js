const stateReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'UPDATE_STATE': {
            const { data } = action.payload;
            return { ...state, ...data };

        } default: {
            return undefined;
        }    
    }
}

export { stateReducer };
