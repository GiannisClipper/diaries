import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { DownIcon, LoadingIcon } from './Icons';
import { doFetch } from '../core/helpers/customFetch';

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
    valueToAssign,  // get value properly to assign (value may be an obj) 
    valueToRepr,  // get value properly to represent (value may be an obj)
    values,
    updateValues,  // to update list values when an item is selected (list may keep all items or the selected one)
    onChange, 
    _onChange, 
    _onMouseDown, 
    _onKeyDown, 
    _onBlur, 
    ...rest 
} ) {

    valueToAssign = valueToAssign || ( value => value );
    valueToRepr = valueToRepr || ( value => value );
    values = values || [];
    updateValues = updateValues || ( updatedValues => updatedValues );

    const [ state, setState ] = useState( { 
        value, 
        valueToAssign, 
        valueToRepr,
        values,
        updateValues,
        index: -1, 
        isOpen: false, 
        ...rest 
    } );

    const openList = event => setState( { ...state, isOpen: true } );
    const toggleList = event => setState( { ...state, isOpen: ! state.isOpen } );

    _onMouseDown = _onMouseDown || (  // when clicking a list value

        ( { index, state, setState, onChange } ) => {

            let { values } = state;
            const selectedValue = values[ index ];
            values = updateValues( [ selectedValue ] );
            index = values.length > 1 ? index : 0;  // list may keep all items or just the selected one
            const value = valueToAssign( selectedValue );

            setState( { ...state, value, values, index, isOpen: false } );
            onChange( { target: { value: selectedValue } } );  // external defined attribute
        }
    )

    _onKeyDown = _onKeyDown || (  // when pressing keys to handle list

        ( { event, state, setState, onChange } ) => {

            event = event || window.event;
            let { value, values, index, isOpen } = state;

            if ( state.values.length > 0 ) {
                if ( event.keyCode === 38 ) {  // up arrow
                    if ( isOpen ) {
                        index = index > 0 ? index - 1 : state.values.length - 1;
                    }
                    setState( { ...state, index, isOpen: true } );

                } else if ( event.keyCode === 40 ) {  // down arrow
                    if ( isOpen ) {
                        index = index < state.values.length - 1 ? index + 1 : 0;
                    }
                    setState( { ...state, index, isOpen: true } );

                } else if ( event.keyCode === 13 ) {  // enter
                    if ( isOpen ) {
                        const selectedValue = index >= 0 ? values[ index ] : null;
                        value = selectedValue ? valueToAssign( selectedValue ) : null;
                        values = updateValues( selectedValue ? [ selectedValue ] : [] );
                        index = values.length > 1 ? index : 0;  // list may keep all items or just the selected one

                        setState( { ...state, value, values, index, isOpen: false } );
                        onChange( { target: { value: selectedValue } } );  // external defined attribute
                    }        
                }
            }
        }
    )

    _onBlur = _onBlur || (  // when exiting from input element

        ( { event, state, setState, onChange } ) => {

            let { value, values, index } = state;
            const selectedValue = index >= 0 ? values[ index ] : null;

            value = 
                ! value  // no value
                ? ''
                : index === -2  // value changed to an invalid one
                ? ''
                : index === -1  // value not changed
                ? value 
                : valueToAssign( values[ index ] );  // index >= 0, value changed to a valid one

            setState( { ...state, value, isOpen: false } );

            if ( index !== -1 ) {
                onChange( { target: { value: selectedValue } } );  // extrnal defined attribute
            }
        }
    )

    const __onChange = _onChange ? event => _onChange( { event, state, setState } ) : null;
    const __onMouseDown = index => _onMouseDown( { index, state, setState, onChange } );
    const __onKeyDown = event => _onKeyDown( { event, state, setState, onChange } );
    const __onBlur = event => _onBlur( { event, state, setState, onChange } );

    const inputRef = useRef( null );
    const listRef = useRef( null );
    const listBounds = useRef( {} );
    const indexRef = useRef( null );

    useEffect( () => {
        let { left, top, width, height } = inputRef.current.getBoundingClientRect();
        top = top + height;

        const { values } = state;
        const rows = Math.min( 6, values.length || 6 );
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

    return (
        <Box>
            <input ref={ inputRef }
                value={ state.value || '' }
                onClick={ openList }
                onChange={ __onChange }
                onKeyDown={ __onKeyDown }
                onBlur={ __onBlur }
            />

            { state.onRequest
                ?
                <InputIcon> 
                    <LoadingIcon />
                </InputIcon>
                :
                <InputIcon onMouseDown={ toggleList } > 
                    <DownIcon />
                </InputIcon>
            }

            { state.isOpen
                ? 
                <InputList ref={ listRef } listBounds={ listBounds }>

                    { state.values.map( ( value, index ) => {
                        const attrs = {
                            key: index,
                            onMouseDown: () => __onMouseDown( index )
                        }

                        if ( index === state.index ) {
                            attrs.ref = indexRef;
                            attrs.index = true;
                        }

                        return (
                            <InputItem { ...attrs } >
                                { valueToRepr( value ) }
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
        const { sourceValues } = state;
        const value = event.target.value;
        const values = sourceValues.filter( x => x.simplified.includes( simplify( value ) ) );
        const index = values.length > 0 ? 0 : -2;

        setState( { ...state, value, values, index } );
    }

    return ( { value, values, onChange } ) =>
        <InputFromList
            value={ value }
            valueToAssign={ value => value.accurate }
            valueToRepr={ value => value.accurate }
            values={ simplifyList( values ) }
            updateValues={ values => simplifyList( values ) }
            onChange={ onChange }
            _onChange={ _onChange }
            sourceValues={ simplifyList( values ) }
        />
}

function WithSelecting( InputFromList ) {

    return ( { value, values, onChange } ) =>
        <InputFromList
            value={ value }
            values={ values }
            updateValues={ () => values }  // list includes all items either there is a value selected or not
            onChange={ onChange }
        />
}

function WithRequesting( InputFromList ) {

    const _onChange = ( { event, state, setState } ) => {
        const value = event.target.value;
        let { url, valueToAssign } = state;

        if ( state.timeout ) {
            clearTimeout( state.timeout );
            setState( { ...state, timeout: null } );
        }

        let { reqFilter, reqResult } = state;

        console.log( value, state )
        if ( value.length === 0 || ( value.includes( reqFilter ) ) ) {
            let values = reqResult || [];
            values = values.filter( x => valueToAssign( x ).toUpperCase().includes( value.toUpperCase() ) );
            const index = values.length > 0 ? 0 : -2;

            setState( { ...state, value, values, index, timeout: null } );

        } else {
            const timeout = setTimeout( () => {
                const args = { method: 'GET' };

                const onDone = res => setState( { 
                    ...state, 
                    value,
                    values: res.dataFromDB,
                    index: -2,
                    reqFilter: value,
                    reqResult: res.dataFromDB,
                    timeout: null,
                    onRequest: false,
                    isOpen: true,
                } );

                const onError = () => setState( { 
                    ...state,
                    value,
                    values: [],
                    index: -2,
                    reqFilter: null,
                    reqResult: [],
                    timeout: null,
                    onRequest: false, 
                    isOpen: true,
                } );

                const dataFromDB = res => res;

                doFetch( url + value, args, onDone, onError, dataFromDB );

                setState( { ...state, value, onRequest: true } );

            }, 1500 );

            setState( { ...state, value, timeout } );
        }

    }

    return ( { value, valueToAssign, valueToRepr, url, onChange } ) =>
        <InputFromList
            value={ value }
            valueToAssign={ valueToAssign }
            valueToRepr={ valueToRepr }
            url={ url }
            onChange={ onChange }
            _onChange={ _onChange }
        />
}

const InputFromListTyping = WithTyping( InputFromList );

const InputFromListSelecting = WithSelecting( InputFromList );

const InputFromListRequesting = WithRequesting( InputFromList );

export { InputFromListTyping, InputFromListSelecting, InputFromListRequesting };