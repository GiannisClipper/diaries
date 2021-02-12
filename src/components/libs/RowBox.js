import styled from 'styled-components';

const RowBox = styled.li`
    display: block;
    width: 100%;
    margin-top: .5em;
    margin-bottom: .5em;

    ${ props => props.theme.RowBox && props.theme.RowBox };
`;

const RowValue = styled.span`
    display: inline-block;
    width: calc( 100% - 4em );
    vertical-align: top;
    text-align: left;
    padding: .5em;

    ${ props => props.theme.RowValue && props.theme.RowValue };
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

    ${ props => props.theme.RowMenu && props.theme.RowMenu };
`;

export default { RowBox, RowValue, RowMenu };
export { RowBox, RowValue, RowMenu };
