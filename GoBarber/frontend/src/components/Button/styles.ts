import styled from 'styled-components';
import { shade } from "polished";

export const Container = styled.button`
    background: #FF9000;
    color: #312e38;
    
    height: 56px;
    border-radius: 10px;
    border: 0;
    
    margin-top: 16px;
    padding: 0 16px;
    width: 100%;

    transition: background-color 0.2s;
    &:hover {
        background: ${shade(0.2, '#FF9000')};
    }
`;