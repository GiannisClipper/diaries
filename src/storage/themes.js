import { css } from 'styled-components';

const createTheme = colors => ( {
    Modal: css`
        background-color: rgba(
            ${parseInt( colors.appNormalBack.substring( 1, 3 ), 16 )},
            ${parseInt( colors.appNormalBack.substring( 3, 5 ), 16 )},
            ${parseInt( colors.appNormalBack.substring( 5, 7 ), 16 )}, 
        0.5 );
    `,
    AppBox: null,
    AppHeader: css`
        background-color: ${colors.appStrongBack};
        color: ${colors.strongText};
    `,
    AppMain: css`
        background-color: ${colors.appNormalBack};
    `,
    ListBox: null,
    BlockBox: null,
    BlockLabel: css`
        background-color: ${colors.normalBack};
        color: ${colors.appNormalBack};
    `,
    BlockValue: css`
        background-color: ${colors.normalBack};
        color: ${colors.normalBack};
    `,
    RowBox: css`
        background-color: ${colors.strongBack};
        color: ${colors.normalText};
        .icon {
            color: ${colors.appNormalBack};
        }
    `,
    RowValue: null,
    RowMenu: css`
        background-color: transparent;
    `,
    MenuBox: css`
        background-color: ${colors.weakBack};
    `,
    ToolBox: css`
        background-color: inherited;
    `,
    FormBox: css`
        background-color: transparent;
        background-color: ${colors.weakBack};
    `,
    InputBox: null,
    InputLabel: css`
        background-color: ${colors.strongBack};
        color: ${colors.normalText};
    `,
    InputValue: css`
        background-color: ${colors.normalBack};
        input, textarea {
            color: ${colors.normalText};
        }
    `,
    ButtonBox: null,
    ButtonLabel: css`
        background-color: transparent;
    `,
    ButtonValue: css`
        background-color: transparent;
    `,
    okButton: css`
        background-color: ${colors.okButton};
    `,
    cancelButton: css`
        background-color: ${colors.cancelButton};
    `,
    cautionButton: css`
        background-color: ${colors.cautionButton};
    `,
} );

const lightColors = {
    appNormalBack: '#bb96ff',
    appStrongBack: '#a778ff',

    weakBack: '#ffffff',
    normalBack: '#f0f0f0', 
    strongBack: '#e0e0e0',

    weakText: '#aaaaaa',
    normalText: '#483863',
    strongText: '#382853',    

    okButton: '#25be46',
    cancelButton: '#f5bc36',
    cautionButton: '#ff5921',
};

const light = createTheme( lightColors );

const darkColors = {
    appNormalBack: '#2E5872',
    appStrongBack: '#4F758D',

    weakBack: '#000000',
    normalBack: '#1b1b1b', 
    strongBack: '#2b2b2b',

    weakText: '#555555',
    normalText: '#CFD6DB',
    strongText: '#010E17',    

    okButton: '#25be46',
    cancelButton: '#f5bc36',
    cautionButton: '#ff5921',
};

const dark = createTheme( darkColors );

export { light, dark };