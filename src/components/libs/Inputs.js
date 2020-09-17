import React, { useRef, useState, useEffect } from 'react';
import '../../styles/libs/Inputs.css';

function InputNumber( { className, value, onChange } ) {

    const _onKeyPress = event => {
        const _key = event.key;
        if ( !'-.0123456789'.includes( _key ) ) {
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

    return (
        <input
            className={`InputNumber ${className}`}
            value={value}
            onKeyPress={_onKeyPress}
            onChange={_onChange}
        />
    )
}

function InputFromList( { className, allValues, value, onChange } ) {

    const listRef = useRef( null );

    const listStatus = useRef({});

    const [ match, setMatch ] = useState( { value, values: allValues } );

    const _onFocus = event => {
        listStatus.current = { isOpen: true };
    }

    const _onChange = event => {
        const value = event.target.value;
        const prevValue = match.value;
        const prevValues = match.values;
        let values = prevValue !== '' && value.includes( prevValue ) ? prevValues : allValues;
        values = values.filter( x => x.includes( value === ' ' ? '' : value ) );
        setMatch( { value, values } );
    }

    const _onMouseDown = value => {
        listStatus.current = {};
        setMatch( { value, values: [ value ] } );
    }

    const _onBlur = event => {
        listStatus.current = {};
        value = event.target.value;
        const prevValue = match.value;
        const prevValues = match.values;
        let values = prevValue !== '' && value.includes( prevValue ) ? prevValues : allValues;
        values = values.filter( x => x.includes( value ) );
        value = value.trim() !== '' && values.length > 0 ? values[ 0 ] : '';
        setMatch( { value, values } );
        onChange( event );
    }

    useEffect( () => {
        if ( listRef.current && !listRef.current.style.left ) {
            let input = listRef.current.parentElement.children[ 0 ];
            let { width, height } = input.getBoundingClientRect();
            listRef.current.style.left = `${0}px`;
            listRef.current.style.top = `${height}px`;
            listRef.current.style.width = `${width}px`;
            listRef.current.style.height = `${height}px`;
        }
    } );

    let _key = -1;

    return (
        <span
            className={`InputRelation ${className}`}
        >
            <input
                value={match.value}
                onFocus={_onFocus}
                onChange={_onChange}
                onBlur={_onBlur}
            />

            {listStatus.current.isOpen
                ? <ul ref={listRef}>
                    {match.values.map( value => 
                        <li 
                            key={++_key}
                            onMouseDown={() => _onMouseDown( value ) }
                        > 
                            {value} 
                        </li> 
                    )}
                </ul>
                : null
            }
        </span>
    )
}

export { InputNumber, InputFromList };