import React from 'react';
import { FiChevronRight } from 'react-icons/fi'; /* Importando ícones, neste caso estamos importando o ícone FiChevronRight. */

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './style';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form action="">
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars1.githubusercontent.com/u/38424834?s=460&u=30562206e41cd265195a7af9c9d57eb6e6374ea8&v=4"
            alt="Foto Autor Repositório"
          />
          <div>
            <strong>jonathancmpc/Go-Stack-back-end</strong>
            <p>Backend Bootcamp</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars1.githubusercontent.com/u/38424834?s=460&u=30562206e41cd265195a7af9c9d57eb6e6374ea8&v=4"
            alt="Foto Autor Repositório"
          />
          <div>
            <strong>jonathancmpc/Go-Stack-back-end</strong>
            <p>Backend Bootcamp</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars1.githubusercontent.com/u/38424834?s=460&u=30562206e41cd265195a7af9c9d57eb6e6374ea8&v=4"
            alt="Foto Autor Repositório"
          />
          <div>
            <strong>jonathancmpc/Go-Stack-back-end</strong>
            <p>Backend Bootcamp</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
