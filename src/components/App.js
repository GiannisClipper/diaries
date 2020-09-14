import React, { useContext } from 'react';
import '../styles/libs/initialize.css';
import '../styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faCompass } from '@fortawesome/free-solid-svg-icons';
import { STATEContextProvider } from './STATEContext';
import { REFContextProvider } from './REFContext';
import { REFContext } from './REFContext';
import Routes from './Routes';

function App() {

    return (
        <STATEContextProvider>
        <REFContextProvider>
        <div className="App">

            <div className="title">
                <GotoDates />
                <GotoSettings />
                <span>Diaries by GiannisClipper</span>
                <ScrollToCentralDate />
            </div>

            <Routes />

        </div>
        </REFContextProvider>
        </STATEContextProvider>
    );
}

const GotoDates = () => {
    return (
        <a href="/dates"> 
            <FontAwesomeIcon icon={ faHome } className="icon" title="Ημερολόγο" />
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

export default App;
