import styled from 'styled-components';
import {containerStyle} from './styles'

export const Input = styled.input`
    border: 0;
    height: 20px;
    font-family: monospace;
    font-size: 16px;
    color: #FFF;
    ${containerStyle}

    &:focus {
        outline: 2px solid #FFF;
    }
`

export const Button = styled.button`
    border: 2px solid #b50202;
    height: 40px;
    font-family: monospace;
    font-size: 16px;
    color: #FFF;
    border-radius: 5px;
    background-color: #db0202;
    padding: 10px 5px;

    &:hover {
        border: 2px solid #fff;
    }
`
