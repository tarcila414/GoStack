import React, { InputHTMLAttributes } from "react";
import { IconBaseProps } from "react-icons";
import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({icon: Icon, ...propsResto}) => {
    return (
        <Container>
            { Icon && <Icon  size={20} /> }
            <input {...propsResto} />
        </Container>
    );
}


export default Input;