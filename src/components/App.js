import React from 'react';
import '../styles/App.css';
import { UIUXContextProvider } from './UIUXContext';
import { DATAContextProvider } from './DATAContext';
import DateList from './DateList';
import Form from './Form';

function App() {

    return (
        <UIUXContextProvider>
        <DATAContextProvider>
        <div className="App">

            <div className="title">
                diaries
            </div>

            <DateList />

            <Form />

        </div>
        </ DATAContextProvider>
        </ UIUXContextProvider>
    );
}

export default App;
