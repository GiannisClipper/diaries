import React, { useContext } from 'react';

import { getFromList } from '../core/helpers/getFromList';

import { GenresContext } from '../workout/genre/GenresContext';
import { EquipsContext } from '../workout/equip/EquipsContext';

const WorkoutRepr = ( { entry, lexicon } ) => {

    const  { genres } = useContext( GenresContext ).state;
    const  { equips } = useContext( EquipsContext ).state;

    let { duration, distance, pace, equip_id, genre_id, remark } = entry;

    const genre_name = genre_id
        ? getFromList( genres, 'id', genre_id ).name
        : '';

    const equip_name = equip_id
        ? getFromList( equips, 'id', equip_id ).name
        : '';

    let repr = '';

    repr += `${ genre_name }, ${ duration } ${ distance }km ${ pace }/km, `;
    repr += equip_name ? `${ equip_name }, ` : '';
    repr += remark ? `${ remark }` : '';

    return <>{ repr }</>
}

export default WorkoutRepr;
export { WorkoutRepr };