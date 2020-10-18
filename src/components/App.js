import React, { useContext } from 'react';
import styled from 'styled-components';
import { InitStyle, centeredness } from './libs/InitStyle'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookOpen, faCog, faCompass, faDoorOpen, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { STATEContextProvider } from './STATEContext';
import { REFContextProvider } from './REFContext';
import { REFContext } from './REFContext';
import Routes from './Routes';
import { realFetch, mockFetch } from '../helpers/customFetch';

const AppHeader = styled.div`
    position: fixed;
    top: 0;
    width: 100%;

    height: 8vh;
    line-height: 8vh;
    background-color: lightsalmon;

    text-align: center;

    * {
        font: inherit;
        color: inherit;
        background-color: inherit;
        margin-left: .5em;
        margin-right: .5em;
    }

    .icon {
        font-size: 1.5em;
    }
`;

const AppMain= styled.div`
    padding-top: 8vh;
    text-align: center;
    ${props => props.centeredness && centeredness}
`;

function App() {

    return (
        <STATEContextProvider>
        <REFContextProvider>
        <InitStyle />

        <AppHeader>
            <GotoSignin />
            <GotoSignout />
            <GotoUsers />
            <GotoDates />
            <GotoSettings />
            <span>Diaries by GiannisClipper</span>
            <ScrollToCentralDate />
            <Dev />
        </AppHeader>

        <AppMain centeredness>
            <Routes />
        </AppMain>

        </REFContextProvider>
        </STATEContextProvider>
    );
}

const GotoSignin = () => {
    return (
        <a href="/signin"> 
            <FontAwesomeIcon icon={ faDoorOpen } className="icon" title="Είσοδος" />
        </a>
    )
}
const GotoSignout = () => {
    return (
        <a href="/signout"> 
            <FontAwesomeIcon icon={ faDoorClosed } className="icon" title="Έξοδος" />
        </a>
    )
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
