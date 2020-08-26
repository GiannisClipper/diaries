import React, { createContext, useReducer } from 'react';
import { shiftDate } from './helpers/dates';

const AppContext = createContext();

const AppContextProvider = props => {

    const today = new Date();

    const notes = [
        'First note...',
        'Second note...',
        'Third note...'
    ];

    const appState = { 
        dates: [
            { date: shiftDate( today, -3 ), dateItems: [ ...notes ] },
            { date: shiftDate( today, -2 ), dateItems: [ ...notes ] },
            { date: shiftDate( today, -1 ), dateItems: [ ...notes ] },
            { date: today, dateItems: [ ...notes ] },
            { date: shiftDate( today, 1 ), dateItems: [ ...notes ] },
            { date: shiftDate( today, 2 ), dateItems: [ ...notes ] },
            { date: shiftDate( today, 3 ), dateItems: [ ...notes ] }
        ],
//        setDates: dates => setState( prevState => ( { ...prevState, dates } ) ),
    };

    const appReducer = ( state, action ) => {

        let dates;

        switch (action.type) {

            case 'ADD_DATES':
                dates = [ ...state.dates ];

                const num = action.payload.num;
                let newDates = new Array( Math.abs( num ) ).fill( undefined );
                const start = num < 0 ? shiftDate( dates[ 0 ].date, num ) : shiftDate( dates[ dates.length - 1 ].date, 1 );
                newDates = newDates.map( ( x, index ) => ({ date: shiftDate( start, index ), dateItems: [ '' ] }) );

                return { ...state, dates: num < 0 ? [ ...newDates, ...dates ] : [ ...dates, ...newDates ] };

            case 'SHIFT_DATE_ITEMS':
                dates = [ ...state.dates ];

                const { date, key1, key2 } = action.payload;
                const timestamp = date.getTime();
                let found = -1;

                for ( let i = 0; i < dates.length; i++ ) {
                    if ( dates[ i ].date.getTime() === timestamp ) {
                        found = i;
                        break;
                    }
                }

                if ( found > -1 ) {
                    const prevDates = dates.slice( 0, found );
                    const foundDate = { ...dates[ found ] };
                    const nextDates = dates.slice( found + 1 );

                    const dateItems = [ ...foundDate.dateItems ];
                    let tmp = dateItems[ key1 ];
                    dateItems[ key1 ] = dateItems[ key2 ];
                    dateItems[ key2 ] = tmp;

                    foundDate.dateItems = dateItems;
                    dates = [ ...prevDates, foundDate, ...nextDates ];
                    return { ...state, dates: dates };
                }

                return state;

            default:
                throw new Error();
        }
    };

    const [ state, dispatch ] = useReducer( appReducer, appState );

    return (
        <AppContext.Provider value={ { state, dispatch } }>
            {props.children}
        </AppContext.Provider>    
    )
}

export { AppContext, AppContextProvider };