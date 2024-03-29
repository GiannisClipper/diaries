import React, { useEffect, useContext } from 'react';

import { DatesContext } from './DatesContext';
import DatesLoader from './DatesLoader';
import Date1 from './Date1';

const Dates = ( { diary_id, startDate, lexicon } ) => {

    const { state } = useContext( DatesContext ); 
    const { dates } = state;

    // useEffect( () => console.log( 'Has rendered. ', 'Dates', dates ) );

    return (
        <ul>
            <DatesLoader 
                diary_id={ diary_id }
            />

            { dates.map( date => (
                <Date1
                    diary_id={ diary_id }
                    date={ date }
                    reference={ date._uiux.isStartDate ? startDate : null }
                    lexicon={ lexicon }
                    key={ date.date }
                />
            ) ) }
        </ul>
    );
}

export default Dates;
export { Dates };