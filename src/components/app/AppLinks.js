import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faEdit, faBookOpen, faCog, faMap, faDoorOpen, faDoorClosed } from '@fortawesome/free-solid-svg-icons';

const LinkBoxStyle = styled.span`
    ${ props => props.theme.LinkBox && props.theme.LinkBox };
    ${ props => props.active && props.theme.activeLinkBox };
`;

const LinkBox = ( { to, icon } ) => {

    return ( { title, active, id } ) => {

        return (
            <Link to={ id ? `${ to }/${ id }` : to }> 
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
} );

const LinkSignin = LinkBox( { 
    to: '/signin', 
    icon: faDoorOpen, 
} );

const LinkSignout = LinkBox( { 
    to: '/signout', 
    icon: faDoorClosed, 
} );

const LinkSettings = LinkBox( { 
    to: '/settings', 
    icon: faCog, 
} );

const LinkUsers = LinkBox( { 
    to: '/users', 
    icon: faUser, 
} );

const LinkDiaries = LinkBox( { 
    to: '/diaries',
    icon: faBookOpen,
} );

const LinkBench = LinkBox( { 
    to: '/bench', 
    icon: faEdit, 
} );

const LinkBenchSettings = LinkBox( { 
    to: '/bench_settings', 
    icon: faCog, 
} );

const LinkReports = LinkBox( { 
    to: '/reports', 
    icon: faMap, 
} );

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
