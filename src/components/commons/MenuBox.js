import styled from 'styled-components';

const MenuBox = styled.div`
    position: fixed;
    background: white;
    padding-left: .5em;
    padding-right: .5em;

    ${ props => props.theme.MenuBox && props.theme.MenuBox };
`;

const OptionBox = styled.span`
    width: 2em;
    display: inline-block;
    vertical-align: top;
    padding: 0.5em 0.25em;
    font-size: 1em;

    ${ props => props.theme.OptionBox && props.theme.OptionBox };
`;

export default MenuBox;
export { MenuBox, OptionBox };