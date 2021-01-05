import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Box = styled.span`
    position: relative;
`;

const InputIcon = styled.span`
    width: 1em;
    margin-left: -1em;
`;

const InputList = styled.ul`
    position: fixed;
    left: ${props => props.listBounds.left}px;
    top: ${props => props.listBounds.top}px;
    width: ${props => props.listBounds.width}px;
    height: ${props => props.listBounds.height}px;
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

    const listRef = useRef( null );

    const [ listBounds, setListBounds ] = useState( {} );

    const listStatus = useRef( {} );

    const [ match, setMatch ] = useState( { value, values: simplifyList( allValues ), index: -2 } );

    const indexRef = useRef( null );

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

        value = ! value 
            ? ''
            : index === -2  // initial value not changed
            ? value 
            : index === -1  // changed to invaid value
            ? ''
            : values[ index ].accurate ;  // index >= 0, changed to valid value

        setMatch( { value, values, index } );
        onChange( { target: { value } } );  // This is an `InputFromList` attribute
    }

    useEffect( () => {
        let { left, top, width, height } = inputRef.current.getBoundingClientRect();
        top = top + height;
        height = parseFloat( getComputedStyle( inputRef.current ).fontSize ) * 5;
        setListBounds( { left, top, width, height } );
    }, [] );

    useEffect( () => {
        if ( indexRef.current ) {
            let { top, height } = indexRef.current.getBoundingClientRect();
            if ( top < listBounds.top ) {
                listRef.current.scrollTop += top - listBounds.top;
            } else if ( top + height > listBounds.top + listBounds.height ) {
                listRef.current.scrollTop += ( top + height ) - ( listBounds.top + listBounds.height );
            }
        }
    }, [ listBounds.top, listBounds.height ] );

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

            <InputIcon onClick={() => listStatus.current.isOpen || _onKeyDown( { keyCode: 40 } ) }>
                <FontAwesomeIcon icon={faCaretDown} />
            </InputIcon>

            {listStatus.current.isOpen
                ? <InputList ref={listRef} listBounds={listBounds}>
                    {match.values.map( value =>
                        ++_key === match.index
                            ? <InputItem index ref={indexRef} key={_key} onMouseDown={() => _onMouseDown( value.accurate )}> {value.accurate} </InputItem>
                            : <InputItem key={_key} onMouseDown={() => _onMouseDown( value.accurate )}> {value.accurate} </InputItem>
                    )}
                </InputList>
                : null
            }
        </Box>
    )
}

export { InputFromList };