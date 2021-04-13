import React from 'react';

function InputEmail( { value, onChange, readOnly } ) {

    onChange = onChange || ( () => {} );

    const _isValid = _val => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test( _val.toLowerCase() );
    }

    const _onBlur = event => {
        let value = event.target.value;
        value = _isValid( value ) ? value : '';
        onChange( { target: { value } } );
    }

    return (
        <input
            value={ value }
            onChange={ onChange }
            onBlur={ _onBlur }
            readOnly={ readOnly }
        />
    )
}

export { InputEmail };