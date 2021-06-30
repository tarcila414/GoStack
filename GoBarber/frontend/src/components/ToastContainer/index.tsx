import React from "react";
import { useTransition } from 'react-spring';

import { ToastMessage } from "../../hooks/ToastContext";

import { Container } from './styles';
import Toast  from './Toast';

interface ToastContainerProps {
    messages: ToastMessage[];
 
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }: ToastContainerProps) => {
    const messagesWithTransitions = useTransition(
            messages,
            message => message.id,
            {
                from: { right: '-120%', border: '1px solid red' },
                enter: { right: '0%' , border: '1px solid red'},
                leave: { right: '-120%', border: '1px solid red' },
            }, 
        ); 

    return (
        <Container> 
            {
                messagesWithTransitions.map(({item, key, props})=> (
                    <Toast 
                        key={key} 
                        style={props}
                        message={item}
                    />                   
                ))
                
                
            }
        </Container>
    );
};


export default ToastContainer;