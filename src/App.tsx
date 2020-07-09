import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Temos que importar esse módulo obrigatoriamente se iremos utilizar as rotas da web.

import GlobalStyle from './styles/global';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyle />
  </>
);

export default App;
