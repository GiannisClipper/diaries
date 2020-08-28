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
                diaries
            </div>

            <DateList />

        </div>
        </ REFContextProvider>
        </ STATEContextProvider>
    );
}

export default App;
