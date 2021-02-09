import styled from 'styled-components';

const IconBox = styled.span`
    display: inline-block;
    // width: 2em;
    vertical-align: top;
    font-size: 100%;
    cursor: pointer;

    ${ props => props.theme.IconBox && props.theme.IconBox };
`;

const RotatingBox = styled.span`
    display: inline-block;
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% { transform: rotate( 0deg ); }
        100% { transform: rotate( 360deg ); }
    }
`;

export { IconBox, RotatingBox };