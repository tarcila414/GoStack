import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';
// import { sign } from 'crypto';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } =useToast();
  const history = useHistory();
 
  const handleSubmit = useCallback ( async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      }); 

      await schema.validate(data, {
        abortEarly: false
      });

      await signIn({
        email: data.email,
        password: data.password
      });

      history.push('/dashboard');

    } catch ( err: any ) {
      if( err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        
        formRef.current?.setErrors( errors );

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
      });      
    }
  }, [signIn, addToast, history]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
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

          <Link to="/signup">
            <FiLogIn/>
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}

export default SignIn;