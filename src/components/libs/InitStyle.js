import { css, createGlobalStyle } from 'styled-components';

const centeredness = css`
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const InitStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;

        border: 0px dotted lightseagreen;

        background-color: inherit;
        font-family: inherit;
        font-size: inherit;
    }

    ul {
        list-style-type: none;
    }

    button {
        cursor: pointer;
    }

    input:-moz-read-only { /* For Firefox */
        color: ${props => props.theme.app.font.disabled};
    }
    
    input:read-only {
        color: ${props => props.theme.app.font.disabled};
    }

    body {
        height: 100vh;
    }
`;

export { InitStyle, centeredness };