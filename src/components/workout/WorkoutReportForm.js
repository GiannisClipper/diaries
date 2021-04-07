import React, { useContext, useEffect } from 'react';

import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputFromListTyping } from '../libs/InputFromList';

import { getFromList } from '../core/helpers/getFromList';

import { GenresContext } from '../workout/genre/GenresContext';
import { EquipsContext } from '../workout/equip/EquipsContext';

function WorkoutReportForm( { data, setData, lexicon } ) {

    const  { genres } = useContext( GenresContext ).state;

    const  { equips } = useContext( EquipsContext ).state;

    if ( data.allGenres === undefined ) {
        let allGenres = [ ...genres ].reverse();
        allGenres = allGenres.filter( ( x, i ) => i === 0 || ! allGenres[ i - 1 ].code.startsWith( x.code ) );
        allGenres = allGenres.map( x => x.name ).filter( x => x !== '' );
        data.allGenres = allGenres;

        data.genre_name = data.genre_id
            ? getFromList( genres, 'id', data.genre_id ).name
            : '';
    }

    if ( data.allEquips === undefined ) {
        let allEquips = [ ...equips ].reverse();
        allEquips = allEquips.filter( ( x, i ) => i === 0 || ! allEquips[ i - 1 ].code.startsWith( x.code ) );
        allEquips = allEquips.map( x => x.name ).filter( x => x !== '' );
        data.allEquips = allEquips;

        data.equip_name = data.equip_id
            ? getFromList( equips, 'id', data.equip_id ).name
            : '';
    }

    const setupGenre = genre_name => {
        let genre_id = null;

        if ( genre_name ) {
            const genre = getFromList( genres, 'name', genre_name );
            genre_id = genre.id;
        }

        return { genre_name, genre_id };
    }

    const setupEquip = equip_name => {
        let equip_id = null;

        if ( equip_name ) {
            const equip = getFromList( equips, 'name', equip_name );
            equip_id = equip.id;
        }

        return { equip_name, equip_id };
    }

    return (
        <>
        <InputBox>
            <InputLabel title={ `${ data.genre_id }` }>
                { lexicon.workout.genre_name }
            </InputLabel>
            <InputValue>
                <InputFromListTyping
                    value={ data.genre_name }
                    allValues={ data.allGenres }
                    onChange={ event => {
                        const genre_name = event.target.value;
                        setData( { ...data, ...setupGenre( genre_name ) } );
                    } }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel title={ `${ data.equip_id }` }>
                { lexicon.workout.equip_name }
            </InputLabel>
            <InputValue>
                <InputFromListTyping
                    value={ data.equip_name }
                    allValues={ data.allEquips }
                    onChange={ event => {
                        const equip_name = event.target.value;
                        setData( { ...data, ...setupEquip( equip_name ) } );
                    } }

                />
            </InputValue>
        </InputBox>
        </>
    );
}

export default WorkoutReportForm;
