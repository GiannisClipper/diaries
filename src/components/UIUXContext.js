import React, { createContext, useReducer } from 'react';

const UIUXContext = createContext();

const UIUXContextProvider = props => {

    const UIUXState = {
        form: { isClose: true },
        entryMenu: { isClose: true },
    };

    const UIUXReducer = ( state, action ) => {

        let prevState;

        switch (action.type) {

            case 'OPEN_FORM':
                prevState = { ...state };
                prevState.form = { isOpen: true };
                return { ...prevState };

            case 'CLOSE_FORM':
                prevState = { ...state };
                prevState.form = { isClose: true };
                return { ...prevState };

            case 'OPEN_ENTRY_MENU':
                prevState = { ...state };
                prevState.entryMenu = { isOpen: true };
                return { ...prevState };

            case 'CLOSE_ENTRY_MENU':
                prevState = { ...state };
                prevState.entryMenu = { isClose: true };
                return { ...prevState };
    
            default:
                throw new Error();
        }
    };

    const [ state, dispatch ] = useReducer( UIUXReducer, UIUXState );

    return (
        <UIUXContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UIUXContext.Provider>    
    )
}

export { UIUXContext, UIUXContextProvider };