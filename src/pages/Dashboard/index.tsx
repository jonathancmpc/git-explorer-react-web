import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi'; /* Importando ícones, neste caso estamos importando o ícone FiChevronRight. */
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './style';

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

  // Criando um estado para erros, quando tivermos erros ele joga nesse estado
  const [inputError, setInputError] = useState('');

  // Usando o useState para listar os repositórios pesquisados, porém ele verifica se já tem uma lista de repositórios pesquisada pelo usuário no Local Storage
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const repositoriesLocalStorage = localStorage.getItem(
      '@GitHubExplorer:repositories',
    );

    if (repositoriesLocalStorage) {
      return JSON.parse(repositoriesLocalStorage);
    }

    return [];
  });

  // Salvando no Storage toda vez que a variável repositories for alterada
  useEffect(() => {
    localStorage.setItem(
      '@GitHubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  // A função abaixo recebe como parâmetro o evento de submit do formulário
  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    // Adição de um novo repositório
    // Consumir API do Github
    // Salvar novo repositório no estado

    event.preventDefault(); // Não deixa a página recarregar após o submit, sempre tem que vir no começo

    // Verificando se o input está vazio e retornando erro
    if (!newRepo) {
      setInputError('Digite um repositório válido (autor/repositório)');
      return; // Se não passarmos o return ele vai continuar o código
    }

    // Tratando o erro se a API não encontrar o repositório
    try {
      // Chamada a API
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo(''); // Limpando o campo de input
      setInputError(''); // Limpando erro
    } catch {
      setInputError('Repositório não encontrado, digite um repositório válido');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      {/* Toda vez que o formulário for submetido, chama a função handleAddRepository, o hasError é passado para verificar se houve erro no formulário(transformamos em Boolean, pois se for true existe erro), então capturamos essa função no styled component(css) para deixar o input com borda vermelha. Para utilizar o hasError, temos que declarar no nosso styled.ts a interface FormProps e passar em Form */}
      <Form hasError={Boolean(inputError)} onSubmit={handleAddRepository}>
        <input
          value={newRepo} // texto do input
          onChange={e => setNewRepo(e.target.value)} // Quando o usuário altera o valor do input recebemos um evento(e), que tem o valor disponível através do e.target.value
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {/* Mostrando a mensagem de erro logo abaixo do nosso repositório com uma simplificação do if, se existir erro mostra o erro */}
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
