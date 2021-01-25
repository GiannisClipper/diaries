import { css, createGlobalStyle } from 'styled-components';

const InitStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;

        border: 0px;

        background-color: inherit;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
    }

    ul {
        list-style-type: none;
    }

    [ draggable ] {
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
    }

    button {
        cursor: pointer;
    }

    *:focus {
        outline: 1px dotted;
    }

    input:-moz-read-only, textarea:-moz-read-only { /* For Firefox */
        color: ${ props => props.theme.weakText };
    }
    
    input:read-only, textarea:read-only {
        color: ${ props => props.theme.weakText };
    }

    body {
        height: 100vh;
    }
`;

const centeredness = css`
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export { InitStyle, centeredness };