import styled from 'styled-components';
import { InputBox, InputLabel, InputValue } from './InputBox';

const ButtonBox = styled( InputBox )`
    min-height: 2.5em;
    ${props => props.theme.ButtonBox && props.theme.ButtonBox };
`;

const ButtonLabel = styled( InputLabel )`
    ${props => props.theme.ButtonLabel && props.theme.ButtonLabel };
`;

const ButtonValue = styled( InputValue )`
    padding: 0;
    ${props => props.theme.ButtonValue && props.theme.ButtonValue };
`;

const ButtonValue1 = styled( ButtonValue )`
    width: calc( 50% - .5em );
    margin-right: .5em;
`;

const ButtonValue2 = styled( ButtonValue )`
    width: calc( 50% - .5em );
    margin-left: .5em;
`;

export default { ButtonBox, ButtonLabel, ButtonValue, ButtonValue1, ButtonValue2 };
export { ButtonBox, ButtonLabel, ButtonValue, ButtonValue1, ButtonValue2 };