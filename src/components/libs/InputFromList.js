import React, { useRef, useState, useEffect } from 'react';
import '../../styles/libs/Inputs.css';

function InputFromList( { className, allValues, value, onChange } ) {

    const inputRef = useRef( null );

    const ulRef = useRef( null );

    const listStatus = useRef( {} );

    const [ match, setMatch ] = useState( { value, values: allValues, index: -1 } );

    const _onFocus = event => {
        listStatus.current = { isOpen: true };
    }

    const _onChange = event => {
        const value = event.target.value;
        const prevValue = match.value;
        const prevValues = match.values;
        let values = prevValue !== '' && value.includes( prevValue ) ? prevValues : allValues;
        values = values.filter( x => x.includes( value ) );
        let index = values.length > 0 ? 0 : -1;
        setMatch( { value, values, index } );
    }

    const _onMouseDown = value => {
        listStatus.current = {};
        const index = 0;
        setMatch( { value, values: [ value ], index } );
    }

    const _onKeyDown = event => {
        listStatus.current = { isOpen: true };
        event = event || window.event;
        let { value, values, index } = match;

        if ( match.values.length > 0 ) {
            if ( event.keyCode === 38 ) {
                index = index > 0 ? index - 1 : match.values.length - 1;
                setMatch( { value, values, index } );

            } else if ( event.keyCode === 40 ) {
                index = index < match.values.length - 1 ? index + 1 : 0;
                setMatch( { value, values, index } );

            } else if ( event.keyCode === 13 ) {
                listStatus.current = {};
                value = index >= 0 ? values[ index ] : null;
                values = value ? [ value ] : [];
                index = value ? 0 : -1;
                setMatch( { value, values, index } );
            }
        }
    }

    const _onBlur = event => {
        listStatus.current = {};
        let { value, values, index } = match;
        value = index >= 0 && value ? values[ index ] : '';
        setMatch( { value, values, index } );
        onChange( { target: { value } } );  // This is an `InputFromList` attribute
    }

    useEffect( () => {
        if ( ulRef.current && !ulRef.current.style.left ) {
            let { left, width, height } = inputRef.current.getBoundingClientRect();
            console.log( left, width, height )
            ulRef.current.style.left = `${left}px`;
            ulRef.current.style.top = `${height}px`;
            ulRef.current.style.width = `${width}px`;
            ulRef.current.style.height = `${height}px`;
        }
    } );

    let _key = -1;

    return (
        <span
            className={`InputFromList ${className}`}
        >
            <input ref={inputRef}
                value={match.value || ''}
                onFocus={_onFocus}
                onChange={_onChange}
                onKeyDown={_onKeyDown}
                onBlur={_onBlur}
            />

            {listStatus.current.isOpen
                ? <ul ref={ulRef}>
                    {match.values.map( value => 
                        <li 
                            key={++_key}
                            className={_key === match.index ? 'index' : null}
                            onMouseDown={() => _onMouseDown( value )}
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

export { InputFromList };