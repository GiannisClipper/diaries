import React from 'react';
import '../../styles/libs/Inputs.css';

function InputNumber( { className, value, onChange } ) {

    const onKeyPress = event => {
        const _key = event.key;
        alert( event.target.s)
        if ( !'-.0123456789'.includes( _key ) ) {
            event.preventDefault();
        }
    }

    const _onChange = event => {
        const value = event.target.value;

        if ( !value.substr( 1, ).includes( '-' ) ) {
            if ( value.indexOf( '.' ) === value.lastIndexOf( '.' ) ) {
                onChange( event );
            }
        }
    }

    return (
        <input
            className={`InputNumber ${className}`}
            value={value}
            onKeyPress={onKeyPress}
            onChange={_onChange}
        />
    )
}

export { InputNumber };