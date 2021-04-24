import React from 'react';

const WorkoutRepr = ( { entry, lexicon } ) => {

    let { duration, distance, pace, genre_name } = entry.type_specs;

    let repr = '';

    distance = parseFloat( distance ).toString();
    
    distance = isNaN( distance ) ? '' : distance;
 
    repr += `${ genre_name } `;
    repr += distance ? `${ distance }km ` : '';
    repr += `${ duration } `;
    repr += pace ? `${ pace }/km` : '';

    return <>{ repr }</>
}

export default WorkoutRepr;
export { WorkoutRepr };