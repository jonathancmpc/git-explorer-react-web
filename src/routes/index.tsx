import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

// O Switch é utilizado para que o React verifique rota por rota, se não tiver, ele verificará todas as rotas de uma vez.
const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/repository/:repository+" exact component={Repository} />
  </Switch>
);

export default Routes;
