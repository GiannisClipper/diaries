import styled from 'styled-components';

const BlockBox = styled.div`
    display: flex;

    width: 100%;
    margin-bottom: 1em;
    text-align: left;

    ${props => props.theme.BlockBox && props.theme.BlockBox };
`;

const BlockLabel = styled.span`
    vertical-align: top;
    display: inline-block;
    width: 8em;
    padding: .5em;
    font-weight: 700;

    ${props => props.theme.BlockLabel && props.theme.BlockLabel };
`;

const BlockValue = styled.span`
    vertical-align: top;
    display: inline-block;
    width: calc( 100% - 8em );
    min-height: 100%;
    padding: .5em;

    ${props => props.theme.BlockValue && props.theme.BlockValue };
`;

export default { BlockBox, BlockLabel, BlockValue };
export { BlockBox, BlockLabel, BlockValue };
