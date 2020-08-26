import React from 'react';
import '../styles/App.css';
import { AppContextProvider } from './AppContext';
import List from './List';

function App() {

    return (
        <AppContextProvider>
            <div className="App">
                <div className="title">
                    diaries
                </div>
                <List />
            </div>
        </ AppContextProvider>
    );
}

export default App;
