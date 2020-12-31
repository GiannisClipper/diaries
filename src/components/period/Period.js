import React, { useEffect } from 'react';
import { DatesContextProvider } from '../date/DatesContext';
import { DateInit } from '../date/DateInit';
import { Dates } from '../date/Date1';

const Period = React.memo( ( { period, centralItem } ) => {

    // useEffect( () => console.log( 'Has rendered. ', 'Period' ) );

    return (
        <DatesContextProvider state={ period }>
            <DateInit />

            <Dates
                centralItem={ centralItem }
            />
        </DatesContextProvider>
    );
} );

const Periods = ( { periods, centralItem } ) => {

    // useEffect( () => console.log( 'Has rendered. ', 'Periods' ) );

    return (
        <ul>
            { periods.map( period => (
                <Period 
                    key={ period.dates[ 0 ].date }
                    period={ period }
                    centralItem={ centralItem }
                />
            ) ) }
        </ul>
    );
}

export { Period, Periods };