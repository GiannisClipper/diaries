import styled from 'styled-components';

const IconBox = styled.span`
    display: inline-block;
    width: 2em;
    vertical-align: top;
    padding: .5em;
    font-size: 1em;

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

const ToolBox = styled( IconBox )`
    cursor: pointer;
`;

export { IconBox, RotatingBox, ToolBox };