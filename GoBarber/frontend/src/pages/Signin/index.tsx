import React, { useRef, useCallback, useContext } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import AuthContext from '../../context/AuthContext';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const auth = useContext(AuthContext);

  console.log(auth);

  const handleSubmit = useCallback ( async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      }); 

      await schema.validate(data, {
        abortEarly: false
      });
    } catch ( err: any ) {
      const errors = getValidationErrors(err);
      
      formRef.current?.setErrors( errors );
    }
  }, []);
  
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

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

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="login">
          <FiLogIn/>
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
}

export default SignIn;