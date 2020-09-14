import React from 'react';
import '../styles/Settings.css';
import GenreList from "./payments/GenreList";
import FundList from "./payments/FundList";

function Settings() {

    return (
        <div className="Settings" >
            <div className="section">
                <span className="label">Κεντρική ημ/νία</span>
                <span className="data">
                    <span className="centralDate">
                        <input placeholder="YYYY-MM-DD" />
                    </span>
                </span>
            </div>

            <div className="section">
                <span className="label">Κατηγορίες οικονομικών κινήσεων</span>
                <GenreList className="data"/>
            </div>

            <div className="section">
                <span className="label">Μέσα οικονομικών κινήσεων</span>
                <FundList className="data"/>
            </div>
        </div>
    );
}

export default Settings;