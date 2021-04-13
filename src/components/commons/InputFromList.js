import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { DownIcon } from './Icons';

const Box = styled.span`
    position: relative;
`;

const InputIcon = styled.span`
    width: 1em;
    margin-left: -1em;
`;

const InputList = styled.ul`
    position: fixed;
    left: ${ props => props.listBounds.current.left }px;
    top: ${ props => props.listBounds.current.top }px;
    width: ${ props => props.listBounds.current.width }px;
    height: ${ props => props.listBounds.current.height }px;
    overflow-y: auto;
    z-index: 999;

    ${ props => props.theme.InputList && props.theme.InputList };
`;

const InputItem = styled.li`
    ${ props => props.theme.InputItem && props.theme.InputItem };
`;

function InputFromList( { allValues, value, onChange, _onChange, _onMouseDown, _onKeyDown, _onBlur } ) {

    const inputRef = useRef( null );
    const listRef = useRef( null );
    const listBounds = useRef( {} );
    const indexRef = useRef( null );
    const [ state, setState ] = useState( { value, values: allValues, index: -2, isOpen: false } );

    const openList = event => {
        setState( { ...state, isOpen: true } );
    };

    const toggleList = event => {
        const { isOpen } = state;
        setState( { ...state, isOpen: ! isOpen } );
    };

    const __onChange = _onChange ? event => _onChange( { event, allValues, state, setState } ) : null;
    const __onMouseDown = _onMouseDown ? value => _onMouseDown( { value, state, setState, onChange } ) : null;
    const __onKeyDown = _onKeyDown ? event => _onKeyDown( { event, state, setState, onChange } ) : null;
    const __onBlur = _onBlur ? event => _onBlur( { event, state, setState, onChange } ) : null;

    useEffect( () => {
        let { left, top, width, height } = inputRef.current.getBoundingClientRect();
        top = top + height;
        height = parseFloat( getComputedStyle( inputRef.current ).fontSize ) * Math.min( 6, allValues.length ) * 1.4;

        listBounds.current = { left, top, width, height } ;
    } );

    useEffect( () => {
        if ( indexRef.current ) {
            let { top, height } = indexRef.current.getBoundingClientRect();

            if ( top < listBounds.current.top ) {
                listRef.current.scrollTop += top - listBounds.current.top;

            } else if ( top + height > listBounds.current.top + listBounds.current.height ) {
                listRef.current.scrollTop += ( top + height ) - ( listBounds.current.top + listBounds.current.height );
            }
        }
    } );

    let _key = -1;

    return (
        <Box>
            <input ref={ inputRef }
                value={ state.value || '' }
                onClick={ openList }
                onChange={ __onChange }
                onKeyDown={ __onKeyDown }
                onBlur={ __onBlur }
            />

            <InputIcon onMouseDown={ toggleList } > 
                <DownIcon />
            </InputIcon>

            { state.isOpen
                ? 
                <InputList ref={ listRef } listBounds={ listBounds }>
                    { state.values.map( value => {
                        value = value.accurate || value;

                        const attrs = {};
                        attrs.key = ++_key;
                        attrs.onMouseDown = () => __onMouseDown( value );

                        if ( _key === state.index ) {
                            attrs.ref = indexRef;
                            attrs.index = true;
                        }

                        return (
                            <InputItem { ...attrs } >
                                { value }
                            </InputItem>
                        );
                    } ) }
                </InputList>
                : 
                null
            }
        </Box>
    )
}

function WithTyping( InputFromList ) {

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

    const _onChange = ( { event, allValues, state, setState } ) => {
        const value = event.target.value;
        const prevValue = state.value;
        const prevValues = state.values;
        let values = prevValue !== '' && value.includes( prevValue ) ? prevValues : allValues;
        values = values.filter( x => x.simplified.includes( simplify( value ) ) );
        let index = values.length > 0 ? 0 : -1;
        setState( { ...state, value, values, index } );
    }

    const _onMouseDown = ( { value, setState, onChange } ) => {
        setState( { value, values: simplifyList( [ value ] ), index: 0, isOpen: false } );
        onChange( { target: { value } } );  // extrnal defined attribute
    }

    const _onKeyDown = ( { event, state, setState, onChange } ) => {
        event = event || window.event;
        let { value, values, index, isOpen } = state;

        if ( state.values.length > 0 ) {
            if ( event.keyCode === 38 ) {  // up arrow
                index = index > 0 ? index - 1 : state.values.length - 1;
                isOpen = true;
                setState( { ...state, index, isOpen } );

            } else if ( event.keyCode === 40 ) {  // down arrow
                index = index < state.values.length - 1 ? index + 1 : 0;
                isOpen = true;
                setState( { ...state, index, isOpen } );

            } else if ( event.keyCode === 13 ) {  // enter
                value = index >= 0 ? values[ index ].accurate : null;
                values = value ? simplifyList( [ value ] ) : [];
                index = value ? 0 : -1;
                isOpen = false;
                setState( { value, values, index, isOpen } );
                onChange( { target: { value } } );  // extrnal defined attribute
            }
        }
    }

    const _onBlur = ( { event, state, setState, onChange } ) => {
        let { value, values, index, isOpen } = state;
        isOpen = false;

        value = 
            ! value 
            ? ''
            : index === -2  // initial value not changed
            ? value 
            : index === -1  // changed to invaid value
            ? ''
            : values[ index ].accurate ;  // index >= 0, changed to valid value

        setState( { ...state, value, isOpen } );
        onChange( { target: { value } } );  // extrnal defined attribute
    }

    return ( { allValues, value, onChange } ) =>
        <InputFromList
            allValues={ simplifyList( allValues ) }
            value={ value }
            onChange={ onChange }
            _onChange={ _onChange } 
            _onMouseDown={ _onMouseDown } 
            _onKeyDown={ _onKeyDown }
            _onBlur={ _onBlur }
        />
}

function WithSelecting( InputFromList ) {

    const _onMouseDown = ( { value, state, setState, onChange } ) => {
        let { values, index } = state;
        for ( let i = 0; i < values.length; i++ ) {
            index = value === values[ i ] ? i : index;
        }
        setState( { ...state, value, index, isOpen: false } );
        onChange( { target: { value } } );  // extrnal defined attribute
    }

    const _onKeyDown = ( { event, state, setState, onChange } ) => {
        event = event || window.event;
        let { value, values, index, isOpen } = state;

        if ( event.keyCode === 38 ) {  // up arrow
            index = index > 0 ? index - 1 : state.values.length - 1;
            isOpen = true;
            setState( { ...state, index, isOpen } );

        } else if ( event.keyCode === 40 ) {  // down arrow
            index = index >= 0 && index < state.values.length - 1 ? index + 1 : 0;
            isOpen = true;
            setState( { ...state, index, isOpen } );

        } else if ( event.keyCode === 13 ) {  // enter
            value = values[ index ];
            isOpen = false;
            setState( { ...state, value, index, isOpen } );
            onChange( { target: { value } } );  // extrnal defined attribute
        }
    }

    const _onBlur = ( { event, state, setState, onChange } ) => {
        let { value, values, index, isOpen } = state;
        isOpen = false;

        value = 
            ! value 
            ? ''
            : index < 0  // initial value not changed
            ? value
            : values[ index ];  // index >= 0, changed to valid value

        setState( { ...state, value, isOpen } );
        onChange( { target: { value } } );  // extrnal defined attribute
    }

    return ( { allValues, value, onChange } ) =>
        <InputFromList
            allValues={ allValues }
            value={ value }
            onChange={ onChange }
            _onMouseDown={ _onMouseDown } 
            _onKeyDown={ _onKeyDown }
            _onBlur={ _onBlur }
        />
}

const InputFromListTyping = WithTyping( InputFromList );

const InputFromListSelecting = WithSelecting( InputFromList );

export { InputFromListTyping, InputFromListSelecting };