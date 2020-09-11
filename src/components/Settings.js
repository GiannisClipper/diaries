import React from 'react';
import '../styles/Settings.css';
import GenreList from "./payments/GenreList";

function Settings() {

    return (
        <div className="Settings" >
            <div className="section">
                <span className="label">Κεντρική ημ/νία</span>
                <span className="data">
                    <input placeholder="YYY-MM-DD" />
                </span>
            </div>

            <div className="section">
                <span className="label">Κατηγορίες οικονομικών κινήσεων</span>
                <GenreList className="data"/>
            </div>

            <div className="section">
                <span className="label">Μέσα οικονομικών κινήσεων</span>
                <span className="data"/>
            </div>
        </div>
    );
}

export default Settings;