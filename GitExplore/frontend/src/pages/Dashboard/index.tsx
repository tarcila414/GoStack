import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import { Title, Form , Repositories, Error } from './styles';
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
    const [ repositories, setRepositories ] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories');
        
        if( storagedRepositories ) {
            return JSON.parse(storagedRepositories);
        } else {
            return [];
        }
    });

    const [ inputError, setInputError ] = useState('');

    useEffect( () => {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
    }, [repositories]);

    async function handleAddRepository( event: FormEvent<HTMLFormElement>): Promise<void>{
        event.preventDefault();
        
        if( !searchInput ) {
            setInputError('Digite o autor/nome_do_repositório');
            return;
        }

        try {
            const response = await api.get<Repository>(`repos/${searchInput}`);
    
            const repository = response.data;
    
            setRepositories([...repositories, repository]);
    
            setSearchInput('');
            setInputError('');
        } catch (err) {
            setInputError('Erro na busca por esse repositório');
        }
    }

    return (
        <>
            <img src = { logoImg } alt="Github Explore"/>
            <Title>Explore repositórios no GitHub</Title>
        
            <Form hasError={ !!inputError } onSubmit={ handleAddRepository}>
                <input 
                    value={ searchInput }
                    onChange = { ( e ) => setSearchInput( e.target.value )}
                    type="text" 
                    placeholder="Digite o nome do repositório" 
                />
                <button type="submit">Pesquisar</button>
            </Form>

            { inputError && <Error>{inputError}</Error> }
            <Repositories>
                {
                    repositories.map( repository => (
                        <Link key={ repository.full_name } to={`/repositories/${repository.full_name}`}>
                            <img 
                                src={repository.owner.avatar_url} 
                                alt={repository.owner.login}
                            />
                            <div>
                                <strong>{ repository.full_name }</strong>
                                <p>{ repository.description }</p>
                            </div>

                            <FiChevronRight size={20} />
                        </Link> 
                    ))
                } 
            </Repositories>
        </>
    );
}


export default Dashboard; 