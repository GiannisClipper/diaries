import React, { useContext, useEffect } from 'react';

import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputDuration } from '../commons/InputDuration';
import { InputNumber } from '../commons/InputNumber';
import { InputFromListTyping } from '../commons/InputFromList';

import { getFromList } from '../core/helpers/getFromList';

import { workoutSchema } from './assets/schemas';

import { GenresContext } from '../workout/genre/GenresContext';
import { EquipsContext } from '../workout/equip/EquipsContext';
import { pace, speed } from './helpers/speedAndPace';

function WorkoutForm( { data, setData, lexicon } ) {

    const  { genres } = useContext( GenresContext ).state;
    const  { equips } = useContext( EquipsContext ).state;

    const type_specs = data.type_specs || workoutSchema().type_specs;

    if ( type_specs.allGenres === undefined ) {
        type_specs.allGenres = [ ...genres ];
        type_specs.allGenres = type_specs.allGenres.reverse();
        type_specs.allGenres = type_specs.allGenres.filter( ( x, i ) => i === 0 || ! type_specs.allGenres[ i - 1 ].code.startsWith( x.code ) );
        type_specs.allGenres = type_specs.allGenres.map( x => x.name ).filter( x => x !== '' );

        type_specs.genre_name = type_specs.genre_id
            ? getFromList( genres, 'id', type_specs.genre_id ).name
            : '';
    }

    if ( type_specs.allEquips === undefined ) {
        type_specs.allEquips = [ ...equips ];
        type_specs.allEquips = type_specs.allEquips.reverse();
        type_specs.allEquips = type_specs.allEquips.filter( ( x, i ) => i === 0 || ! type_specs.allEquips[ i - 1 ].code.startsWith( x.code ) );
        type_specs.allEquips = type_specs.allEquips.map( x => x.name ).filter( x => x !== '' );

        type_specs.equip_name = type_specs.equip_id
            ? getFromList( equips, 'id', type_specs.equip_id ).name
            : '';
    }

    const setupGenre = name => {
        let genre_id = null;

        if ( name ) {
            const genre = getFromList( genres, 'name', name );
            genre_id = genre.id;
        }

        return { genre_id };
    }

    const setupDuration = duration => {
        const { distance } = type_specs;
        return {
            speed: speed( { duration, distance } ),
            pace: pace( { duration, distance } )
        }
    } 

    const setupDistance = distance => {
        const { duration } = type_specs;
        return {
            speed: speed( { duration, distance } ),
            pace: pace( { duration, distance } )
        }
    } 

    const setupEquip = name => {
        let equip_id = null;

        if ( name ) {
            const equip = getFromList( equips, 'name', name );
            equip_id = equip.id;
        }

        return { equip_id };
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
                        setData( { ...data, type_specs: { ...type_specs, genre_name, ...setupGenre( genre_name ) } } );
                    } }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { lexicon.workout.duration }
            </InputLabel>
            <InputValue>
                <InputDuration
                    decimals="3"
                    value={ type_specs.duration || '' }
                    onChange={ event => {
                        const duration = event.target.value;
                        setData( { ...data, type_specs: { ...type_specs, duration, ...setupDuration( duration ) } } );
                    } }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { lexicon.workout.distance }
            </InputLabel>
            <InputValue>
                <InputNumber
                    decimals="3"
                    value={ type_specs.distance || '' }
                    onChange={ event => {
                        const distance = event.target.value;
                        setData( { ...data, type_specs: { ...type_specs, distance, ...setupDistance( distance ) } } );
                    } }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { `${ lexicon.workout.pace }, ${ lexicon.workout.speed }` }
            </InputLabel>
            <InputValue>
                <input 
                    value={ 
                        `${ type_specs.pace || '' }/${ lexicon.workout.distance }, ` +
                        `${ type_specs.speed || '' } ${ lexicon.workout.distance }/${ lexicon.workout.hour }`
                    }
                    tabIndex="-1"
                    readOnly
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { lexicon.workout.remark }
            </InputLabel>
            <InputValue>
                <textarea
                    rows="3"
                    maxLength="250"
                    value={ type_specs.remark || '' }
                    onChange={ event => setData( { ...data, type_specs: { ...type_specs, remark: event.target.value } } ) }
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
                        setData( { ...data, type_specs: { ...type_specs, equip_name, ...setupEquip( equip_name ) } } );
                    } }

                />
            </InputValue>
        </InputBox>
        </>
    );
}

export default WorkoutForm;
