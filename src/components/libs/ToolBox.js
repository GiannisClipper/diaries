import styled from 'styled-components';

const ToolBox = styled.span`
    width: 2em;
    display: inline-block;
    vertical-align: top;
    padding: .5em;
    font-size: 1em;
    cursor: pointer;

    ${props => props.theme.ToolBox && props.theme.ToolBox };
`;

export default ToolBox;
export { ToolBox };