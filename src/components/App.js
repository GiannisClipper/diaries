import React, { useContext } from 'react';
import '../styles/libs/initialize.css';
import '../styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
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
                <span>Diaries by GiannisClipper</span>
                <ScrollToCentralDate />
            </div>

            <Routes />

        </div>
        </REFContextProvider>
        </STATEContextProvider>
    );
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
