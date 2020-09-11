import React from 'react';
import '../styles/Settings.css';
import GenreList from "./payments/GenreList";

function Settings() {

    return (
        <div className="Settings" >
            <div className="section centralDate">
                <span>Κεντρική ημ/νία</span>
                <input placeholder="YYY-MM-DD" />
            </div>
            <div className="section paymentGenres">
                <span>Κατηγορίες οικονομικών κινήσεων</span>
                <GenreList />
            </div>
            <div className="section paymentFunds">
                <span>Μέσα οικονομικών κινήσεων</span>
                <span />
            </div>
        </div>
    );
}

export default Settings;