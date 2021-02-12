const comboReducer = ( ...reducers ) => {

    return ( state, action ) => {

        for ( let reducer of reducers ) {

            const newState = reducer( state, action );

            if ( newState !== undefined ) {
                return newState;
            }
        }

        console.log( 'undefined type:', action.type )

        return state;
    }
}

export default comboReducer;
export { comboReducer };