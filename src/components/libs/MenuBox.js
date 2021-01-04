import styled from 'styled-components';

const MenuBox = styled.div`
    position: fixed;
    background: white;
    padding-left: .5em;
    padding-right: .5em;

    ${ props => props.theme.MenuBox && props.theme.MenuBox };
`;

const MenuOptionBox = styled.span`
    width: 2em;
    display: inline-block;
    vertical-align: top;
    padding: .5em;
    font-size: 1em;
    cursor: pointer;

    ${ props => props.theme.MenuOptionBox && props.theme.MenuOptionBox };
`;

export default MenuBox;
export { MenuBox, MenuOptionBox };