import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form , Repositories} from './styles';
import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
    return (
        <>
            <img src = { logoImg } alt="Github Explore"/>
            <Title>Explore repositórios no GitHub</Title>
        
            <Form >
                <input type="text" placeholder="Digite o nome do repositório" />
                <button type="submit">Pesquisar</button>
            </Form>

            <Repositories>
                <a href="test">
                    <img 
                        src="https://lh3.googleusercontent.com/a-/AOh14Gi9a63PrTzPQhmi9nfrXSbSchS6h8yGb8TvyoqWZA=s96-c-rg-br100" 
                        alt="Tarcila Fernanda" 
                    />
                    <div>
                        <strong>rocketseat/unform</strong>
                        <p>Easy peasy highly scalable ReactJS E ReactNative forms! 👓</p>
                    </div>

                    <FiChevronRight size={20} />
                </a> 
                <a href="test">
                    <img 
                        src="https://lh3.googleusercontent.com/a-/AOh14Gi9a63PrTzPQhmi9nfrXSbSchS6h8yGb8TvyoqWZA=s96-c-rg-br100" 
                        alt="Tarcila Fernanda" 
                    />
                    <div>
                        <strong>rocketseat/unform</strong>
                        <p>Easy peasy highly scalable ReactJS E ReactNative forms! 👓</p>
                    </div>

                    <FiChevronRight size={20} />
                </a> 
                <a href="test">
                    <img 
                        src="https://lh3.googleusercontent.com/a-/AOh14Gi9a63PrTzPQhmi9nfrXSbSchS6h8yGb8TvyoqWZA=s96-c-rg-br100" 
                        alt="Tarcila Fernanda" 
                    />
                    <div>
                        <strong>rocketseat/unform</strong>
                        <p>Easy peasy highly scalable ReactJS E ReactNative forms! 👓</p>
                    </div>

                    <FiChevronRight size={20} />
                </a> 
                <a href="test">
                    <img 
                        src="https://lh3.googleusercontent.com/a-/AOh14Gi9a63PrTzPQhmi9nfrXSbSchS6h8yGb8TvyoqWZA=s96-c-rg-br100" 
                        alt="Tarcila Fernanda" 
                    />
                    <div>
                        <strong>rocketseat/unform</strong>
                        <p>Easy peasy highly scalable ReactJS E ReactNative forms! 👓</p>
                    </div>

                    <FiChevronRight size={20} />
                </a> 
            </Repositories>
        </>
    );
}


export default Dashboard; 