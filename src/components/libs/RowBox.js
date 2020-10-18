import styled from 'styled-components';

const RowBox = styled.li`
    display: block;
    width: 100%;
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
        color: lightcoral;
        width: 1.5em;
        height: 1.5em;
        padding: .25em;    
    }
`;

export default { RowBox, RowValue, RowMenu };
export { RowBox, RowValue, RowMenu };
