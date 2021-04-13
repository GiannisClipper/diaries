import React from 'react';
import { stringToTime, timeToString } from '../core/helpers/times';

function InputDuration( { value, onChange, readOnly } ) {

    onChange = onChange || ( () => {} );

    const separator = ':';

    const _isValid = value => {
        value = value || {};
        const { hours, minutes, seconds } = value;
    
        return (
            Number.isInteger( hours ) && hours >= 0 && 
            Number.isInteger( minutes ) && minutes >= 0 && 
            Number.isInteger( minutes ) && minutes <= 59 && 
            Number.isInteger( seconds ) && minutes >= 0 && 
            Number.isInteger( seconds ) && seconds <= 59 
        )
        ? true
        : false;
    }

    const _onBlur = event => {
        let value = event.target.value;
        const time = stringToTime( value );
        value = _isValid( time ) ? timeToString( { ...time, separator } ) : '';
        onChange( { target: { value } } );
    }

    return (
        <input
            value={ value !== null ? value : '' }
            onChange={ onChange }
            onBlur={ _onBlur }
            readOnly={ readOnly }
            placeholder={ `Ω${ separator }ΛΛ${ separator }ΔΔ` }
        />
    )
}

export { InputDuration };