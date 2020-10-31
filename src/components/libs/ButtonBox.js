import styled from 'styled-components';
import { InputBox, InputLabel, InputValue } from './InputBox';

const ButtonBox = styled( InputBox )`
    ${props => props.theme.ButtonBox && props.theme.ButtonBox };
`;

const ButtonLabel = styled( InputLabel )`
    ${props => props.theme.ButtonLabel && props.theme.ButtonLabel };
`;

const ButtonValue = styled( InputValue )`
    padding: 0;
    ${props => props.theme.ButtonValue && props.theme.ButtonValue };
`;

export default { ButtonBox, ButtonLabel, ButtonValue };
export { ButtonBox, ButtonLabel, ButtonValue };