import React, { useEffect, useContext } from 'react';
import { DatesContext } from './DatesContext';
import DatesInit from './DatesInit';
import Date1 from './Date1';

const Dates = ( { startDate } ) => {

    const { state } = useContext( DatesContext ); 
    const { dates } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'Dates', dates ) );

    return (
        <ul>
            <DatesInit />

            { dates.map( date => (
                <Date1
                    date={ date }
                    reference={ date._uiux.isStartDate ? startDate : null }
                    key={ date.date }
                />
            ) ) }
        </ul>
    );
}

export default Dates;
export { Dates };