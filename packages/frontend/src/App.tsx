import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import path from 'admin/src/constants/clientPath';
import LoginPage from './containers/Login/loadable';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './containers/Dashboard';
import history from './utils/history';

function App() {
  const s3ConfigPath = (/#!(\/.*)$/.exec(history.location.hash) || [])[1];
  if (s3ConfigPath) {
    history.replace(s3ConfigPath);
  }
  return (
    <HashRouter>
      <Switch>
        {/**
         * PUBLIC PATHS
         *  */}
        {/* <Route exact path={path.LOGIN} component={LoginPage} /> */}
        {/**
         * PROTECTED PATHS
         */}
        <ProtectedRoute path={path.DASHBOARD} component={Dashboard} />
        <ProtectedRoute path={path.ROOT} component={Dashboard} />
      </Switch>
    </HashRouter>
  );
}

export default App;
