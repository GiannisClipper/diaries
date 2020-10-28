import styled from 'styled-components';

const RowBox = styled.li`
    display: block;
    width: 100%;
    .icon {
        color: ${props => props.theme.app.background.normal};
    }
`;

const RowValue = styled.span`
    display: inline-block;
    width: calc( 100% - 4em );
    vertical-align: top;
    text-align: left;
    padding: .5em;
`;

const RowMenu = styled.span`
    display: inline-block;
    width: 4em;
    vertical-align: top;
    text-align: left;
    .icon {
        width: 1.5em;
        height: 1.5em;
        padding: .25em;    
    }
`;

export default { RowBox, RowValue, RowMenu };
export { RowBox, RowValue, RowMenu };
