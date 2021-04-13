import React, { useContext, useEffect } from 'react';

import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputFromListTyping } from '../commons/InputFromList';

import { getFromList } from '../core/helpers/getFromList';

import { GenresContext } from '../workout/genre/GenresContext';
import { EquipsContext } from '../workout/equip/EquipsContext';

function WorkoutReportForm( { data, setData, lexicon } ) {

    const  { genres } = useContext( GenresContext ).state;
    const  { equips } = useContext( EquipsContext ).state;

    const { type_specs } = data;

    if ( type_specs.allGenres === undefined ) {
        type_specs.allGenres = [ ...genres ]
            .reverse()
            .filter( ( x, i ) => i === 0 || ! type_specs.allGenres[ i - 1 ].code.startsWith( x.code ) )
            .map( x => x.name ).filter( x => x !== '' );

        type_specs.genre_name = type_specs.genre_id
            ? getFromList( genres, 'id', type_specs.genre_id ).name
            : '';
    }

    if ( type_specs.allEquips === undefined ) {
        type_specs.allEquips = [ ...equips ]
            .reverse()
            .filter( ( x, i ) => i === 0 || ! type_specs.allEquips[ i - 1 ].code.startsWith( x.code ) )
            .map( x => x.name ).filter( x => x !== '' );

        type_specs.equip_name = type_specs.equip_id
            ? getFromList( equips, 'id', type_specs.equip_id ).name
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
            <InputLabel title={ `${ type_specs.genre_id }` }>
                { lexicon.workout.genre_name }
            </InputLabel>
            <InputValue>
                <InputFromListTyping
                    value={ type_specs.genre_name }
                    allValues={ type_specs.allGenres }
                    onChange={ event => {
                        const genre_name = event.target.value;
                        setData( { ...data, type_specs: { ...type_specs, ...setupGenre( genre_name ) } } );
                    } }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel title={ `${ type_specs.equip_id }` }>
                { lexicon.workout.equip_name }
            </InputLabel>
            <InputValue>
                <InputFromListTyping
                    value={ type_specs.equip_name }
                    allValues={ type_specs.allEquips }
                    onChange={ event => {
                        const equip_name = event.target.value;
                        setData( { ...data, type_specs: { ...type_specs, ...setupEquip( equip_name ) } } );
                    } }

                />
            </InputValue>
        </InputBox>
        </>
    );
}

export default WorkoutReportForm;
