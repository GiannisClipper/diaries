import styled from 'styled-components';

const InputBox = styled.div`
    min-height: 2.5em;
    width: 80%;
    display: flex;
    margin: auto;
    margin-top: 1em;
    margin-bottom: 1em;
    text-align: left;

    ${props => props.theme.InputBox && props.theme.InputBox };
`;

const InputLabel = styled.span`
    vertical-align: top;
    display: inline-block;
    width: 6em;
    padding: .5em;

    ${props => props.theme.InputLabel && props.theme.InputLabel };
`;

const InputValue = styled.span`
    vertical-align: top;
    display: inline-block;
    width: calc( 100% - 6em );
    min-height: 100%;
    padding: .5em;
    textarea, input {
        width: 100%;
        height: 100%;
    }
    input[type=checkbox] {
        width: 0;
        height: 0;
    }

    ${props => props.theme.InputValue && props.theme.InputValue };
`;

export default { InputBox, InputLabel, InputValue };
export { InputBox, InputLabel, InputValue };
