import styled from 'styled-components';

const MenuBox = styled.div`
    position: fixed;
    background: white;
    padding-left: .5em;
    padding-right: .5em;

    ${props => props.theme.MenuBox && props.theme.MenuBox };
`;

export default MenuBox;
export { MenuBox };