import styled from 'styled-components';
import { InputBox } from './InputBox';

const HeadBox = styled( InputBox )`
    align-items: center;
    justify-content: center;
    font-weight: 600;
    ${props => props.theme.HeadBox && props.theme.HeadBox };
`;

export { HeadBox };
