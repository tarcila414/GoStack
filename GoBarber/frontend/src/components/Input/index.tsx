import React, { InputHTMLAttributes, useEffect, useState, useCallback, useRef } from "react";
import { IconBaseProps } from "react-icons";
import { Container } from "./styles";
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({name, icon: Icon, ...propsResto}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [ isFocused, setIsFocused ] = useState(false);
    const [ isFilled, setIsFilled ] = useState(false);
    const { fieldName, defaultValue, error, registerField } = useField(name);


    const handleInputFocus = useCallback (() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback (() => {
        setIsFocused(false);

        setIsFilled( !!inputRef.current?.value); // se houver algo no input setamos true
    }, []);
    
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    return (
        <Container isFilled={isFilled} isFocused={ isFocused }>
            { Icon && <Icon  size={20} /> }
            <input 
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue} 
                ref={ inputRef }
                {...propsResto} 
            />
        </Container>
    );
}


export default Input;