import React from 'react';

const WorkoutRepr = ( { entry, lexicon } ) => {

    let { duration, distance, pace, equip_name, genre_name, remark } = entry.type_specs;

    let repr = '';

    repr += `${ genre_name }, ${ duration } ${ distance }km ${ pace }/km, `;
    repr += equip_name ? `${ equip_name }, ` : '';
    repr += remark ? `${ remark }` : '';

    return <>{ repr }</>
}

export default WorkoutRepr;
export { WorkoutRepr };