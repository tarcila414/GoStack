import React, { FormEvent, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import { Title, Form , Repositories } from './styles';
import logoImg from '../../assets/logo.svg';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;  
        avatar_url: string;
    }

}


const Dashboard: React.FC = () => {
    const [ searchInput, setSearchInput ] = useState('');
    const [ repositories, setRepositories ] = useState<Repository[]>([]);


    async function handleAddRepository( event: FormEvent<HTMLFormElement>): Promise<void>{
        event.preventDefault();

        const response = await api.get<Repository>(`repos/${searchInput}`);

        const repository = response.data;

        setRepositories([...repositories, repository]);

        setSearchInput('');
    }

    return (
        <>
            <img src = { logoImg } alt="Github Explore"/>
            <Title>Explore repositórios no GitHub</Title>
        
            <Form onSubmit= { handleAddRepository}>
                <input 
                    value={ searchInput }
                    onChange = { ( e ) => setSearchInput( e.target.value )}
                    type="text" 
                    placeholder="Digite o nome do repositório" 
                />
                <button type="submit">Pesquisar</button>
            </Form>

            <Repositories>
                {
                    repositories.map( repository => (
                        <a key={ repository.full_name } href="test">
                            <img 
                                src={repository.owner.avatar_url} 
                                alt={repository.owner.login}
                            />
                            <div>
                                <strong>{ repository.full_name }</strong>
                                <p>{ repository.description }</p>
                            </div>

                            <FiChevronRight size={20} />
                        </a> 
                    ))
                } 
            </Repositories>
        </>
    );
}


export default Dashboard; 