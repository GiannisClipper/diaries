import React, { useContext, useEffect } from 'react';

import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputDuration } from '../libs/InputDuration';
import { InputNumber } from '../libs/InputNumber';
import { InputFromListTyping } from '../libs/InputFromList';

import { getFromList } from '../core/helpers/getFromList';

import { GenresContext } from '../workout/genre/GenresContext';
import { EquipsContext } from '../workout/equip/EquipsContext';
import { pace, speed } from './helpers/speedAndPace';

function WorkoutForm( { data, setData, lexicon } ) {

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

    const setupGenre = name => {
        let genre_id = null;

        if ( name ) {
            const genre = getFromList( genres, 'name', name );
            genre_id = genre.id;
        }

        return { genre_id };
    }

    const setupDuration = duration => {
        const { distance } = data;
        return {
            speed: speed( { duration, distance } ),
            pace: pace( { duration, distance } )
        }
    } 

    const setupDistance = distance => {
        const { duration } = data;
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
            <InputLabel title={ `${ data.genre_id }` }>
                { lexicon.workout.genre_name }
            </InputLabel>
            <InputValue>
                <InputFromListTyping
                    value={ data.genre_name }
                    allValues={ data.allGenres }
                    onChange={ event => {
                        const genre_name = event.target.value;
                        setData( { ...data, genre_name, ...setupGenre( genre_name ) } );
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
                    value={ data.duration || '' }
                    onChange={ event => {
                        const duration = event.target.value;
                        setData( { ...data, duration, ...setupDuration( duration ) } ) 
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
                    value={ data.distance || '' }
                    onChange={ event => {
                        const distance = event.target.value;
                        setData( { ...data, distance, ...setupDistance( distance ) } ) 
                    } }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { lexicon.workout.speed }
            </InputLabel>
            <InputValue>
                <input 
                    value={ `${ data.speed || '' } ${ lexicon.workout.distance }/${ lexicon.workout.hour }` }
                    tabIndex="-1"
                    readOnly
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { lexicon.workout.pace }
            </InputLabel>
            <InputValue>
                <input 
                    value={ `${ data.pace || '' }/${ lexicon.workout.distance }` }
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
                    cols="100"
                    maxLength="500"
                    value={ data.remark || '' }
                    onChange={event => setData( { ...data, remark: event.target.value } )}
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
                        setData( { ...data, equip_name, ...setupEquip( equip_name ) } );
                    } }

                />
            </InputValue>
        </InputBox>
        </>
    );
}

export default WorkoutForm;
