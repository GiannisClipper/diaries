import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const Box = styled.span`
    position: relative;
`;

const InputList = styled.ul`
    position: fixed;
    left: ${props => props.inputSpecs.left}px;
    top: ${props => props.inputSpecs.top + props.inputSpecs.height}px;
    width: ${props => props.inputSpecs.width}px;
    height: 6em;
    overflow-y: auto;
    z-index: 999;

    ${props => props.theme.InputList && props.theme.InputList };
`;

const InputItem = styled.li`
    ${props => props.theme.InputItem && props.theme.InputItem };
`;

const simplify = value => value.toUpperCase();

const simplifyList = values => {
    for ( let i = 0; i< values.length; i++ ) {
        if ( i === 0 && typeof values[ i ] === 'object' ) {
            return values;
        }
        values[ i ] = { 
            accurate: values[ i ],
            simplified: simplify( values[ i ] ),
        }
    }
    return values;
}

function InputFromList( { className, allValues, value, onChange } ) {

    const inputRef = useRef( null );

    const [ inputSpecs, setInputSpecs ] = useState( {} );

    const listStatus = useRef( {} );

    const [ match, setMatch ] = useState( { value, values: simplifyList( allValues ), index: -1 } );

    const _onFocus = event => {
        listStatus.current = { isOpen: true };
    }

    const _onChange = event => {
        const value = event.target.value;
        const prevValue = match.value;
        const prevValues = match.values;
        let values = prevValue !== '' && value.includes( prevValue ) ? prevValues : allValues;
        values = values.filter( x => x.simplified.includes( simplify( value ) ) );
        let index = values.length > 0 ? 0 : -1;
        setMatch( { value, values, index } );
    }

    const _onMouseDown = value => {
        listStatus.current = {};
        const index = 0;
        setMatch( { value, values: simplifyList( [ value ] ), index } );
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
                value = index >= 0 ? values[ index ].accurate : null;
                values = value ? simplifyList( [ value ] ) : [];
                index = value ? 0 : -1;
                setMatch( { value, values, index } );
            }
        }
    }

    const _onBlur = event => {
        listStatus.current = {};
        let { value, values, index } = match;
        value = index >= 0 && value ? values[ index ].accurate : '';
        setMatch( { value, values, index } );
        onChange( { target: { value } } );  // This is an `InputFromList` attribute
    }

    useEffect( () => {
        let { left, top, width, height } = inputRef.current.getBoundingClientRect();
        setInputSpecs( { left, top, width, height } );
    }, [] );

    let _key = -1;

    return (
        <Box>
            <input ref={inputRef}
                className={`InputFromList ${className}`}
                value={match.value || ''}
                onFocus={_onFocus}
                onChange={_onChange}
                onKeyDown={_onKeyDown}
                onBlur={_onBlur}
            />

            {listStatus.current.isOpen
                ? <InputList inputSpecs={inputSpecs}>
                    {match.values.map( value =>
                        ++_key === match.index
                            ? <InputItem index key={_key} onMouseDown={() => _onMouseDown( value )}> {value.accurate} </InputItem>
                            : <InputItem key={_key} onMouseDown={() => _onMouseDown( value )}> {value.accurate} </InputItem>
                    )}
                </InputList>
                : null
            }
        </Box>
    )
}

export { InputFromList };