import React, { useEffect } from 'react';
import Period from './Period';

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

export default Periods;
export { Periods };