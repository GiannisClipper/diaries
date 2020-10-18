import styled from 'styled-components';

const BlockBox = styled.div`
    display: flex;

    width: 100%;
    margin-bottom: 1em;
    text-align: left;
`;

const BlockLabel = styled.span`
    vertical-align: top;
    display: inline-block;
    width: 8em;
    padding: .5em;
    background-color: lightsteelblue;
    color: lightcoral;
    font-weight: 700;
`;

const BlockValue = styled.span`
    vertical-align: top;
    display: inline-block;
    width: calc( 100% - 8em );
    min-height: 100%;
    padding: .5em;
    background-color: lightsteelblue;
`;

export default { BlockBox, BlockLabel, BlockValue };
export { BlockBox, BlockLabel, BlockValue };
