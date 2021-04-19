import React from 'react';

import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputRequestingList } from '../commons/InputList';

import { urls } from '../app/assets/urls';

function WorkoutReportForm( { data, setData, lexicon } ) {

    const { diary_id, type_specs } = data;

    return (
        <>
        <InputBox>
            <InputLabel title={ `${ type_specs.genre_id }` }>
                { lexicon.workout.genre_name }
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
                            genre_code: value ? value.code : null,
                        }
                        setData( { ...data, type_specs: { ...type_specs, ...specs } } );
                    } }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel title={ `${ type_specs.equip_id }` }>
                { lexicon.workout.equip_name }
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
                            equip_code: value ? value.code : null,
                        }
                        setData( { ...data, type_specs: { ...type_specs, ...specs } } );
                    } }
                />
            </InputValue>
        </InputBox>
        </>
    );
}

export default WorkoutReportForm;
