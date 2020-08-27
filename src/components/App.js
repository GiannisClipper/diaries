import React from 'react';
import '../styles/App.css';
import { AppContextProvider } from './AppContext';
import List from './List';
import Form from './Form';

function App() {

    return (
        <AppContextProvider>
            <div className="App">
                <div className="title">
                    diaries
                </div>
                <List />
                <Form />
            </div>
        </ AppContextProvider>
    );
}

export default App;
