import React, { useContext } from 'react';
import '../styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { STATEContextProvider } from './STATEContext';
import { REFContextProvider } from './REFContext';
import { REFContext } from './REFContext';
import DateList from './DateList';

function App() {

    return (
        <STATEContextProvider>
        <REFContextProvider>
        <div className="App">

            <div className="title">
                <button onClick={ event => checkLambda( event )}>check Lamdba</button>
                <button onClick={ event => checkMongo( event )}>check Mongo</button>
                <button onClick={ event => retrieveDates( event )}>read Dates</button>
                Diaries by GiannisClipper
                <ScrollToCentralDate />
            </div>

            <DateList />

        </div>
        </REFContextProvider>
        </STATEContextProvider>
    );
}

const ScrollToCentralDate = () => {

    const REF = useContext( REFContext );

    return (
        <button onClick={ event => REF.current.scrollToCentral( event )}>
            <FontAwesomeIcon icon={ faCompass } className="icon" title="Μετακίνηση στην κεντρική ημ/νία" />
        </button>
    )
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

const checkMongo = () => {
    fetch( '/.netlify/functions/mongo-connect', {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'GET',
        //body: JSON.stringify( {} )
    } )
    .then( res => res.text() )
    .then( data => alert( data ) );
}

const retrieveDates = () => {
    fetch( '/.netlify/functions/retrieve-dates?range=20200901-20200902', {
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
