import React from 'react';
import styled from 'styled-components';

const ListBox = styled.div`
    min-height: 100vh;
    //min-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: center;
`;

function List( { children } ) {
    return (
        <ListBox>
            {children}
        </ListBox>
    );
}

const BlockBox = styled.div`
    width: 80%;
    display: flex;
    margin: auto;
    margin-top: 1em;
    text-align: left;
`;

const BlockLabel = styled.span`
    vertical-align: top;
    display: inline-block;
    width: 8em;
    padding: .5em;
    background-color: lightsteelblue;
    color: lightcoral;
    font-weight: 700;
`;

const BlockValue = styled.span`
    vertical-align: top;
    display: inline-block;
    width: calc( 100% - 8em );
    min-height: 100%;
    padding: .5em;
    background-color: lightsteelblue;
`;

function Block( { label, children } ) {
    return (
        <BlockBox>
            <BlockLabel>
                {label}
            </BlockLabel>
            <BlockValue>
                {children}
            </BlockValue>
        </BlockBox>
    );
}

const RowBox = styled.li`
    display: block;
    width: 100%;
    border: 1px dotted black;
`;

const RowData = styled.span`
    display: inline-block;
    width: calc( 100% - 4em );
    vertical-align: top;
    text-align: left;
    padding: .5em;
`;

const RowMenu = styled.span`
    display: inline-block;
    width: 4em;
    vertical-align: top;
    text-align: left;
    .icon {
        color: lightcoral;
        width: 1.5em;
        height: 1.5em;
        padding: .25em;    
    }
`;

export { List, Block, RowBox, RowData, RowMenu };
