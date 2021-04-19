import React from 'react';

import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputDuration } from '../commons/InputDuration';
import { InputNumber } from '../commons/InputNumber';
import { InputRequestingList } from '../commons/InputList';

import { urls } from '../app/assets/urls';

import { workoutSchema } from './assets/schemas';
import { pace, speed } from './helpers/speedAndPace';

function WorkoutForm( { data, setData, lexicon } ) {

    let { diary_id, type_specs } = data;
    type_specs = type_specs || workoutSchema();

    return (
        <>
        <InputBox>
            <InputLabel title={ `${ type_specs.genre_id }` }>
                { lexicon.workouts.genre_name }
            </InputLabel>
            <InputValue>
                <InputRequestingList
                    value={ type_specs.genre_name }
                    valueToAssign={ value => value.name }
                    valueToRepr={ value => value.name }    
                    url={ `${ urls.workout_genres }?diary_id=${ diary_id }&name=` }
                    onChange={ event => {
                        const { value } = event.target;
                        const specs = {
                            genre_id: value ? value._id : null,
                            genre_name: value ? value.name : null,
                        }
                        setData( { ...data, type_specs: { ...type_specs, ...specs } } );
                    } }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { lexicon.workouts.duration }
            </InputLabel>
            <InputValue>
                <InputDuration
                    decimals="3"
                    value={ type_specs.duration || '' }
                    onChange={ event => {
                        const duration = event.target.value;
                        const { distance } = type_specs;
                        const specs = {
                            speed: speed( { duration, distance } ),
                            pace: pace( { duration, distance } )
                        }
                        setData( { ...data, type_specs: { ...type_specs, duration, ...specs } } );
                    } }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { lexicon.workouts.distance }
            </InputLabel>
            <InputValue>
                <InputNumber
                    decimals="3"
                    value={ type_specs.distance || '' }
                    onChange={ event => {
                        const distance = event.target.value;
                        const { duration } = type_specs;
                        const specs = {
                            speed: speed( { duration, distance } ),
                            pace: pace( { duration, distance } )
                        }
                        setData( { ...data, type_specs: { ...type_specs, distance, ...specs } } );
                    } }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { `${ lexicon.workouts.pace }, ${ lexicon.workouts.speed }` }
            </InputLabel>
            <InputValue>
                <input 
                    value={ 
                        `${ type_specs.pace || '' }/${ lexicon.workouts.distance }, ` +
                        `${ type_specs.speed || '' } ${ lexicon.workouts.distance }/${ lexicon.workouts.hour }`
                    }
                    tabIndex="-1"
                    readOnly
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { lexicon.workouts.remark }
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
                { lexicon.workouts.equip_name }
            </InputLabel>
            <InputValue>
                <InputRequestingList
                    value={ type_specs.equip_name }
                    valueToAssign={ value => value.name }
                    valueToRepr={ value => value.name }    
                    url={ `${ urls.workout_equips }?diary_id=${ diary_id }&name=` }
                    onChange={ event => {
                        const { value } = event.target;
                        const specs = {
                            equip_id: value ? value._id : null,
                            equip_name: value ? value.name : null,
                        }
                        setData( { ...data, type_specs: { ...type_specs, ...specs } } );
                    } }
                />

            </InputValue>
        </InputBox>
        </>
    );
}

export default WorkoutForm;
