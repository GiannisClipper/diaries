import { css } from 'styled-components';

const createTheme = colors => ( {
    Modal: css`
        background-color: rgba(
            ${parseInt( colors.appNormalBack.substring( 1, 3 ), 16 )},
            ${parseInt( colors.appNormalBack.substring( 3, 5 ), 16 )},
            ${parseInt( colors.appNormalBack.substring( 5, 7 ), 16 )}, 
        0.5 );
    `,
    AppNav: null,
    AppBox: css`
        background-color: ${colors.appNormalBack};
        color: ${colors.appNormalText};
    `,
    AppInfo: css`
        color: ${colors.appNormalText};
        font-weight: 600;
    `,
    LinkBox: css`
        :first-child {
            color: ${colors.appNormalText};
            font-weight: 600;
        }
    `,
    activeLinkBox: css`
        :first-child {
            color: ${colors.strongBack};
        }
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
    MenuOptionBox: css`
        background-color: inherited;
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
    InputList: css`
        background-color: ${colors.normalBack};
        outline: 1px dotted;    
    `,
    InputItem: css`
        ${props => props.index && css`
            background-color: ${colors.strongBack};
        `}
    `,
    ButtonBox: null,
    ButtonLabel: css`
        background-color: transparent;
    `,
    ButtonValue: css`
        background-color: transparent;
    `,
    OkButton: css`
        background-color: ${colors.OkButtonBack};
        color: ${colors.OkButtonText};
        .icon { 
            color: ${colors.OkButtonText}; 
        }
    `,
    CancelButton: css`
        background-color: ${colors.CancelButtonBack};
        color: ${colors.CancelButtonText};
        .icon { 
            color: ${colors.CancelButtonText}; 
        }
    `,
    CautionButton: css`
        background-color: ${colors.CautionButtonBack};
        color: ${colors.CautionButtonText};
        .icon { 
            color: ${colors.CautionButtonText}; 
        }
    `,
} );

const lightColors = {
    appNormalBack: '#bb96ff',
    appStrongBack: '#a778ff',

    appNormalText: '#382853',

    weakBack: '#ffffff',
    normalBack: '#f0f0f0', 
    strongBack: '#e0e0e0',

    weakText: '#aaaaaa',
    normalText: '#483863',
    strongText: '#382853',    

    OkButtonBack: '#25be46',
    CancelButtonBack: '#f5bc36',
    CautionButtonBack: '#ff5921',

    OkButtonText: '#382853',
    CancelButtonText: '#382853',
    CautionButtonText: '#382853',
};

const light = createTheme( lightColors );

const darkColors = {
    appNormalBack: '#4F758D',
    appStrongBack: '#2E5872',

    appNormalText: '#010E17',

    weakBack: '#111111',
    normalBack: '#1b1b1b', 
    strongBack: '#222222',

    weakText: '#555555',
    normalText: '#CFD6DB',
    strongText: '#010E17',    

    OkButtonBack: '#25be46',
    CancelButtonBack: '#f5bc36',
    CautionButtonBack: '#ff5921',

    OkButtonText: '#bb96ff',
    CancelButtonText: '#bb96ff',
    CautionButtonText: '#bb96ff',
};

const dark = createTheme( darkColors );

export { light, dark };