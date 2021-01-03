import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { centeredness } from '../libs/InitStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookOpen, faCog, faCompass, faMap, faDoorOpen, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import texts from '../../storage/texts';

import { REFContext } from '../REFContext';

const LinkHome = () => {
    return (
        <Link to="/"> 
            <FontAwesomeIcon icon={ faCompass } className="icon" title="Αρχική" />
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
            <FontAwesomeIcon icon={ faBookOpen } className="icon" title="Ημερολόγια" />
        </Link>
    )
}

const LinkBench = () => {
    return (
        <Link to="/bench"> 
            <FontAwesomeIcon icon={ faBookOpen } className="icon" title="Εγγραφές" />
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

const AppNavStyle = styled.div`
    position: fixed;
    top: 0;
    width: 100%;

    height: 8vh;
    line-height: 8vh;

    text-align: center;

    * {
        font: inherit;
        color: inherit;
        background-color: inherit;
        margin-left: .5em;
        margin-right: .5em;
    }

    .icon {
        font-size: 1.5em;
        background-color: transparent;
    }

    ${ props => props.theme.AppNav && props.theme.AppNav };
`;

const AppNav = props => {

    return (
        <AppNavStyle>

            <span>{ texts.heads.app }</span>

            { props.children }

        </AppNavStyle>
    );
}

const AppBox = styled.div`
    padding-top: 8vh;
    text-align: center;
    ${ props => props.centeredness && centeredness }
    ${ props => props.theme.AppBox && props.theme.AppBox };
`;

const AppPage = props => {
    return (
        <>
        <AppNav>
            <LinkHome />
            <LinkDiaries />
            <LinkUsers />
            <LinkSettings />
            <LinkSignout />
        </AppNav>

        <AppBox centeredness/>
        </>
    );
}

export default AppPage;
export { 
    LinkHome,
    LinkSignin,
    LinkSignout,
    LinkSettings,
    LinkUsers,
    LinkDiaries,
    LinkBench,
    LinkReports,
    AppNav,
    AppBox,
    AppPage,
};