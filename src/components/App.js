import React from 'react';
import '../styles/App.css';
import { STATEContextProvider } from './STATEContext';
import { REFContextProvider } from './REFContext';
import DateList from './DateList';

function App() {

    return (
        <STATEContextProvider>
        <REFContextProvider>
        <div className="App">

            <div className="title">
                <button onClick={ event => checkLambda( event )}>check Lamdba</button>
                Diaries by GiannisClipper
            </div>

            <DateList />

        </div>
        </ REFContextProvider>
        </ STATEContextProvider>
    );
}

const fetch = require( 'node-fetch' );

const checkLambda = () => {
    fetch( '/.netlify/functions/hello', {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'GET',
        //body: JSON.stringify( {} )
    } )
    .then( res => res.text() )
    .then( data => alert( data ) );
}

export default App;
