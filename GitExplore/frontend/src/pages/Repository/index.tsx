import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Header, RepositoryInfo, Issues } from './styles';
import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
    repository: string;
}

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();

    return (
        <>
            <Header>
                <img src = { logoImg } alt="Github Explore"/>
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

           <RepositoryInfo>
                <header>
                    <img src="https://lh3.googleusercontent.com/a-/AOh14Gi9a63PrTzPQhmi9nfrXSbSchS6h8yGb8TvyoqWZA=s96-c-rg-br100" alt="Tarcila" />

                    <div>
                        <strong>rocketseat/unform</strong>
                        <p>descrição do repositorio</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>11801</strong>
                        <span>Stars</span>
                    </li>
                    <li>
                        <strong>48</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>11</strong>
                        <span>Issues abertas</span>
                    </li>
                </ul>
            </RepositoryInfo>

            <Issues>
                <Link key={''} to={`kk`}>
                    <div>
                        <strong>{ `kj` }</strong>
                        <p>{`huh`}</p>
                    </div>

                    <FiChevronRight size={20} />
                </Link> 
            </Issues> 
        </>
    );
}


export default Repository; 