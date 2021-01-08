import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faEdit, faBookOpen, faCog, faCogs, faCompass, faMap, faDoorOpen, faDoorClosed } from '@fortawesome/free-solid-svg-icons';

import { REFContext } from '../REFContext';

const LinkBoxStyle = styled.span`
    ${ props => props.theme.LinkBox && props.theme.LinkBox };
    ${ props => props.active && props.theme.activeLinkBox };
`;

const LinkBox = ( { to, icon, title } ) => {

    return ( { id, active } ) => {

        return (
            <Link to={ id ? `${to}/${id}` : to }> 
                <LinkBoxStyle active={ active }>
                    <FontAwesomeIcon icon={ icon } className="icon" title={ title } />
                </LinkBoxStyle>
            </Link>
        ) 
    }
}

const LinkHome = LinkBox( { 
    to: "/", 
    icon: faHome, 
    title: "Αρχική" 
} );

const LinkSignin = LinkBox( { 
    to: '/signin', 
    icon: faDoorOpen, 
    title: 'Είσοδος' 
} );

const LinkSignout = LinkBox( { 
    to: '/signout', 
    icon: faDoorClosed, 
    title: 'Έξοδος' 
} );

const LinkSettings = LinkBox( { 
    to: '/settings', 
    icon: faCog, 
    title: 'Ρυθμίσεις' 
} );

const LinkUsers = LinkBox( { 
    to: '/users', 
    icon: faUser, 
    title: 'Χρήστες' 
} );

const LinkDiaries = LinkBox( { 
    to: '/diaries', 
    icon: faBookOpen, 
    title: 'Ημερολόγια' 
} );

const LinkBench = LinkBox( { 
    to: '/bench', 
    icon: faEdit, 
    title: 'Εγγραφές' 
} );

const LinkBenchSettings = LinkBox( { 
    to: '/bench_settings', 
    icon: faCogs, 
    title: 'Ρυθμίσεις' 
} );

const LinkReports = LinkBox( { 
    to: '/reports', 
    icon: faMap, 
    title: 'Καταστάσεις' 
} );

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
