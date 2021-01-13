import React, { useEffect } from 'react';
import { DatesContextProvider } from '../date/DatesContext';
import { Dates } from '../date/Dates';

const Period = React.memo( ( { period, startDate } ) => {

    // useEffect( () => console.log( 'Has rendered. ', 'Period' ) );

    return (
        <DatesContextProvider state={ period }>
            <Dates
                startDate={ startDate }
            />
        </DatesContextProvider>
    );
} );

export default Period;
export { Period };