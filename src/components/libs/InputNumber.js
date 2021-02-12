import React from 'react';

function InputNumber( { value, decimals, onChange, readOnly, tabIndex } ) {

    decimals = parseInt( decimals || '0' );
    onChange = onChange || ( () => {} );

    const _onKeyPress = event => {
        const digits = '-0123456789' + ( decimals > 0 ? '.' : '' );
        const _key = event.key;
        if ( !digits.includes( _key ) ) {
            event.preventDefault();
        }
    }

    const _onChange = event => {
        const _val = event.target.value;

        if ( !_val.substr( 1, ).includes( '-' ) ) {
            if ( _val.indexOf( '.' ) === _val.lastIndexOf( '.' ) ) {
                onChange( event );
            }
        }
    }

    const _formatted = value => parseFloat( value ).toFixed( decimals );

    const _onBlur = event => {
        let value = event.target.value;
        value = value ? _formatted( value ) : '';
        onChange( { target: { value } } );
    }

    return (
        <input
            value={ value }
            onKeyPress={ _onKeyPress }
            onChange={ _onChange }
            onBlur={ _onBlur }
            readOnly={ readOnly }
            tabIndex={ tabIndex }
        />
    )
}

export { InputNumber };