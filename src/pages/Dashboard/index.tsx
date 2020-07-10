import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi'; /* Importando ícones, neste caso estamos importando o ícone FiChevronRight. */
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './style';

interface Repository {
  // Atenção: não é necessário informa a tipagem de tudo que o repositório tem, pois são muito dados, mas colocamos somente as informações que eu vou utilizar
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  // Criando um estado só para armazenar o valor do input do formulário
  const [newRepo, setNewRepo] = useState('');

  const [repositories, setRepositories] = useState<Repository[]>([]);

  // A função abaixo recebe como parâmetro o evento de submit do formulário
  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    // Adição de um novo repositório
    // Consumir API do Github
    // Salvar novo repositório no estado

    event.preventDefault(); // Não deixa a página recarregar após o submit

    // Chamada a API
    const response = await api.get<Repository>(`repos/${newRepo}`);

    const repository = response.data;

    setRepositories([...repositories, repository]);
    setNewRepo(''); // Limpando o campo de input
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      {/* Toda vez que o formulário for submetido, chama a função handleAddRepository */}
      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo} // texto do input
          onChange={e => setNewRepo(e.target.value)} // Quando o usuário altera o valor do input recebemos um evento(e), que tem o valor disponível através do e.target.value
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories.map(repository => (
          <a key={repository.full_name} href="teste">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
