import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBook, faBookOpen, faCog, faCogs, faCompass, faMap, faDoorOpen, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../app/AppContext';

import { REFContext } from '../REFContext';

const LinkHome = () => {
    return (
        <Link to="/"> 
            <FontAwesomeIcon icon={ faHome } className="icon" title="Αρχική" />
        </Link>
    )
}

const LinkSignin = () => {
    return (
        <Link to="/signin"> 
            <FontAwesomeIcon icon={ faDoorOpen } className="icon" title="Είσοδος" />
        </Link>
    )
}

const LinkSignout = () => {
    return (
        <Link to="/signout"> 
            <FontAwesomeIcon icon={ faDoorClosed } className="icon" title="Έξοδος" />
        </Link>
    )
}

const LinkSettings = () => {
    return (
        <Link to="/settings"> 
            <FontAwesomeIcon icon={ faCog } className="icon" title="Ρυθμίσεις" />
        </Link>
    )
}

const LinkUsers = () => {
    return (
        <Link to="/users"> 
            <FontAwesomeIcon icon={ faUser } className="icon" title="Χρήστες" />
        </Link>
    )
}

const LinkDiaries = () => {
    return (
        <Link to="/diaries"> 
            <FontAwesomeIcon icon={ faBook } className="icon" title="Ημερολόγια" />
        </Link>
    )
}

const LinkBench = ( { diary_id } ) => {

    return (
        <Link to={ `/bench/${diary_id}` }> 
            <FontAwesomeIcon icon={ faBookOpen } className="icon" title="Εγγραφές" />
        </Link>
    )
}

const LinkBenchSettings = () => {
    return (
        <Link to="/bench_settings"> 
            <FontAwesomeIcon icon={ faCogs } className="icon" title="Ρυθμίσεις" />
        </Link>
    )
}

const LinkReports = () => {
    return (
        <Link to="/reports"> 
            <FontAwesomeIcon icon={ faMap } className="icon" title="Καταστάσεις" />
        </Link>
    )
}

// const ScrollToCentralDate = () => {
//     const REF = useContext( REFContext );
//     return (
//         <button onClick={ event => REF.current.scrollToCentralDate( event )}>
//             <FontAwesomeIcon icon={ faCompass } className="icon" title="Μετακίνηση στην κεντρική ημ/νία" />
//         </button>
//     )
// }

export { 
    LinkHome,
    LinkSignin,
    LinkSignout,
    LinkSettings,
    LinkUsers,
    LinkDiaries,
    LinkBench,
    LinkBenchSettings,
    LinkReports,
};
