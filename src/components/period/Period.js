import React, { useEffect } from 'react';
import { DatesContextProvider } from '../date/DatesContext';
import { DateInit } from '../date/DateInit';
import { Dates } from '../date/Date1';

const Period = React.memo( ( { period, startDate } ) => {

    // useEffect( () => console.log( 'Has rendered. ', 'Period' ) );

    return (
        <DatesContextProvider state={ period }>
            <DateInit />

            <Dates
                startDate={ startDate }
            />
        </DatesContextProvider>
    );
} );

const Periods = ( { periods, startDate } ) => {

    // useEffect( () => console.log( 'Has rendered. ', 'Periods' ) );

    return (
        <ul>
            { periods.map( period => (
                <Period 
                    key={ period.dates[ 0 ].date }
                    period={ period }
                    startDate={ startDate }
                />
            ) ) }
        </ul>
    );
}

export { Period, Periods };