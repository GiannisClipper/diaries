import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import '../styles/libs/initialize.css';
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
        <BrowserRouter>
        <div className="App">

            <div className="title">
                <span>Diaries by GiannisClipper</span>
                <ScrollToCentralDate />
            </div>

            {/* <DateList /> */}
            <Switch>
                <Route exact path='/dates' component={DateList} />
                <Route render={() => (<Redirect to={{ pathname: '/dates' }} />)} />
            </Switch>


        </div>
        </BrowserRouter>
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
