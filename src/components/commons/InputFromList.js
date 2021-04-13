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

function InputFromList( { 
    value,
    getValue,  // export from [ values ] to assign
    values,
    setValues,  // set [ values ] structured as defined
    onChange, 
    _onChange, 
    _onMouseDown, 
    _onKeyDown, 
    _onBlur, 
    ...rest 
} ) {

    getValue = getValue || ( value => value );
    values = values || [];
    setValues = setValues || ( values => values );

    const [ state, setState ] = useState( { value, values, index: -1, isOpen: false, ...rest } );

    const openList = event => setState( { ...state, isOpen: true } );
    const toggleList = event => setState( { ...state, isOpen: ! state.isOpen } );

    _onMouseDown = _onMouseDown || (

        ( { value, state, setState, onChange } ) => {
            const values = setValues( [ value ] );
            let index = -2;

            for ( let i = 0; i < values.length; i++ ) {
                index = value === getValue( values[ i ] ) ? i : index;
            }
    
            setState( { ...state, value, values, index, isOpen: false } );
            onChange( { target: { value } } );  // external defined attribute
        }
    )

    _onKeyDown = _onKeyDown || (

        ( { event, state, setState, onChange } ) => {
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
                    value = index >= 0 ? getValue( values[ index ] ) : null;
                    values = value ? setValues( [ value ] ) : [];
                    index = -2;

                    for ( let i = 0; i < values.length; i++ ) {
                        index = value === getValue( values[ i ] ) ? i : index;
                    }
        
                    isOpen = false;
                    setState( { ...state, value, values, index, isOpen } );
                    onChange( { target: { value } } );  // external defined attribute
                }
            }
        }
    )

    _onBlur = _onBlur || (

        ( { event, state, setState, onChange } ) => {
            let { value, values, index, isOpen } = state;
            isOpen = false;

            value = 
                ! value 
                ? ''
                : index === -2  // changed to invaid value
                ? ''
                : index === -1  // initial value not changed
                ? value 
                : getValue( values[ index ] );  // index >= 0, changed to valid value

            setState( { ...state, value, isOpen } );
            onChange( { target: { value } } );  // extrnal defined attribute
        }
    )

    const __onChange = _onChange ? event => _onChange( { event, state, setState } ) : null;
    const __onMouseDown = _onMouseDown ? value => _onMouseDown( { value, state, setState, onChange } ) : null;
    const __onKeyDown = _onKeyDown ? event => _onKeyDown( { event, state, setState, onChange } ) : null;
    const __onBlur = _onBlur ? event => _onBlur( { event, state, setState, onChange } ) : null;

    const inputRef = useRef( null );
    const listRef = useRef( null );
    const listBounds = useRef( {} );
    const indexRef = useRef( null );

    useEffect( () => {
        let { left, top, width, height } = inputRef.current.getBoundingClientRect();
        top = top + height;

        const { values } = state;
        const rows = Math.min( 6, values.length || 1 );
        height = parseFloat( getComputedStyle( inputRef.current ).fontSize ) * rows * 1.4;

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
                        value = getValue( value );

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

    const _onChange = ( { event, state, setState } ) => {
        const { allValues } = state;
        const value = event.target.value;
        const values = allValues.filter( x => x.simplified.includes( simplify( value ) ) );
        const index = values.length > 0 ? 0 : -2;

        setState( { ...state, value, values, index } );
    }

    return ( { allValues, value, onChange } ) =>
        <InputFromList
            value={ value }
            getValue={ value => value.accurate }
            values={ simplifyList( allValues ) }
            setValues={ values => simplifyList( values ) }
            onChange={ onChange }
            _onChange={ _onChange } 
            allValues={ simplifyList( allValues ) }
        />
}

function WithSelecting( InputFromList ) {

    return ( { allValues, value, onChange } ) =>
        <InputFromList
            value={ value }
            values={ allValues }
            setValues={ values => allValues }
            onChange={ onChange }
            allValues={ allValues }
        />
}

function WithRequesting( InputFromList ) {

    const _onChange = ( { event, allValues, state, setState } ) => {
        const value = event.target.value;

        const { timeout } = state;
        if ( timeout ) {
            clearTimeout( timeout )
        }

        const { reqFilter, reqResult } = state;

        if ( ( value.length === 0 ) || ( value.includes( reqFilter ) ) ) {
            let values = reqResult || [];
            values = values.filter( x => x.includes( value ) );
            const index = values.length > 0 ? 0 : -2;
            console.log( 'filter', state.value, values )
            setState( { ...state, value, values, index, timeout: null } );
    
        } else {
            const timeout = setTimeout( () => {
                let values = [
                    value + '0',
                    value + '1',
                    value + '2',
                    value + '00',
                    value + '11',
                    value + '22',
                ];
                console.log( 'req', state.value, values )
                const index = values.length > 0 ? 0 : -2;
                setState( { ...state, value, values, index, reqFilter: value, reqResult: values, timeout: null } );
            }, 1000 );

            setState( { ...state, value, timeout } );
        }

    }

    const _onMouseDown = ( { value, state, setState, onChange } ) => {
        setState( { ...state, value, values: [ value ], index: 0, isOpen: false } );
        onChange( { target: { value } } );  // external defined attribute
    }

    return ( { allValues, value, onChange } ) =>
        <InputFromList
            allValues={ [] }
            value={ value }
            onChange={ onChange }
            _onChange={ _onChange } 
            _onMouseDown={ _onMouseDown } 
        />
}

const InputFromListTyping = WithTyping( InputFromList );

const InputFromListSelecting = WithSelecting( InputFromList );

const InputFromListRequesting = WithRequesting( InputFromList );

export { InputFromListTyping, InputFromListSelecting, InputFromListRequesting };