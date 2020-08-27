import React from 'react';
import '../styles/App.css';
import { DATAContextProvider } from './DATAContext';
import { UIUXContextProvider } from './UIUXContext';
import { REFContextProvider } from './REFContext';
import DateList from './DateList';
import Form from './Form';

function App() {

    return (
        <DATAContextProvider>
        <UIUXContextProvider>
        <REFContextProvider>
        <div className="App">

            <div className="title">
                diaries
            </div>

            <DateList />

            <Form />

        </div>
        </ REFContextProvider>
        </ UIUXContextProvider>
        </ DATAContextProvider>
    );
}

export default App;
