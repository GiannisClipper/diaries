import styled from 'styled-components';

const InputBox = styled.div`
    width: 80%;
    display: flex;
    margin: auto;
    margin-top: 1em;
    margin-bottom: 1em;
    text-align: left;
`;

const InputLabel = styled.span`
    vertical-align: top;
    display: inline-block;
    width: 6em;
    padding: .5em;
    background-color: ${props => props.theme.page.background.front};
    color: ${props => props.theme.app.font.normal};
`;

const InputValue = styled.span`
    vertical-align: top;
    display: inline-block;
    width: calc( 100% - 6em );
    min-height: 100%;
    padding: .5em;
    background-color: ${props => props.theme.page.background.normal};
    input, textarea {
        width: inherit;
        color: ${props => props.theme.app.font.normal};
    }
`;

export default { InputBox, InputLabel, InputValue };
export { InputBox, InputLabel, InputValue };
