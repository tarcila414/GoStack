import React, { ButtonHTMLAttributes } from "react";
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...propsResto}) => {
    return (
        <Container {...propsResto}> 
            { children } 
        </Container>
    );
}


export default Button;