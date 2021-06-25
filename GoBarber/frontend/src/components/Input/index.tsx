import React, { InputHTMLAttributes, useEffect, useRef } from "react";
import { IconBaseProps } from "react-icons";
import { Container } from "./styles";
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({name, icon: Icon, ...propsResto}) => {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, error, registerField } = useField(name);
    
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    return (
        <Container>
            { Icon && <Icon  size={20} /> }
            <input defaultValue={defaultValue} ref={ inputRef } {...propsResto} />
        </Container>
    );
}


export default Input;