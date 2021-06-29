import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback ( async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
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
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} /*initialData={{name:"" }} para setar valores iniciais nos inputs*/ onSubmit={handleSubmit}>
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