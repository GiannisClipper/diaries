import styled from 'styled-components';
import { InputBox, InputLabel, InputValue } from './InputBox';

const ButtonBox = InputBox;

const ButtonLabel = styled( InputLabel )`
    background-color: transparent;
`;

const ButtonValue = styled( InputValue )`
    padding: 0;
    background-color: transparent;
`;

export default { ButtonBox, ButtonLabel, ButtonValue };
export { ButtonBox, ButtonLabel, ButtonValue };