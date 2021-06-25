import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';

import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

const SignUp: React.FC = () => {
  function handleSubmit( data: object): void {
    console.log(data);
    
  }
  
  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form /*initialData={{name:"" }} para setar valores iniciais nos inputs*/ onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input 
            name="name" 
            placeholder="Nome"
            icon={ FiUser } 
          />

          <Input 
            name="email" 
            placeholder="Email"
            icon={ FiMail } 
          />

          <Input 
            name="password" 
            type="password" 
            placeholder="Senha" 
            icon={ FiLock }
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="login">
          <FiArrowLeft/>
          Voltar para logon
        </a>
      </Content>
      
    </Container>
  );
}

export default SignUp;