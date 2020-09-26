import React, { useContext } from 'react';
import '../styles/libs/initialize.css';
import '../styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookOpen, faCog, faCompass } from '@fortawesome/free-solid-svg-icons';
import { STATEContextProvider } from './STATEContext';
import { REFContextProvider } from './REFContext';
import { REFContext } from './REFContext';
import Routes from './Routes';
import { realFetch, mockFetch } from '../helpers/customFetch';

function App() {

    return (
        <STATEContextProvider>
        <REFContextProvider>
        <div className="App">

            <div className="title">
                <GotoUsers />
                <GotoDates />
                <GotoSettings />
                <span>Diaries by GiannisClipper</span>
                <ScrollToCentralDate />
                <Dev />
            </div>

            <Routes />

        </div>
        </REFContextProvider>
        </STATEContextProvider>
    );
}

const GotoUsers = () => {
    return (
        <a href="/users"> 
            <FontAwesomeIcon icon={ faUser } className="icon" title="Χρήστες" />
        </a>
    )
}
const GotoDates = () => {
    return (
        <a href="/dates"> 
            <FontAwesomeIcon icon={ faBookOpen } className="icon" title="Ημερολόγο" />
        </a>
    )
}
const GotoSettings = () => {
    return (
        <a href="/settings"> 
            <FontAwesomeIcon icon={ faCog } className="icon" title="Ρυθμίσεις" />
        </a>
    )
}
const ScrollToCentralDate = () => {
    const REF = useContext( REFContext );
    return (
        <button onClick={ event => REF.current.scrollToCentralDate( event )}>
            <FontAwesomeIcon icon={ faCompass } className="icon" title="Μετακίνηση στην κεντρική ημ/νία" />
        </button>
    )
}
const Dev = () => {
    return (
        <button onClick={ event => {
            realFetch( `/.netlify/functions/dev`, { method: 'GET' } )
            .then( res => {
                alert( JSON.stringify( res ) );
            } )
            .catch( err => { 
                alert( err );
            } );
        } }>
            Dev
        </button>
    )
}

export default App;
