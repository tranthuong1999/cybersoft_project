/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import Theme from './themes';
import GlobalStyles from './themes/GlobalStyles';
import history from './utils/history';
import GlobalContainer from './containers/Global';
import store from './redux/store';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const root = ReactDOM.createRoot(document.getElementById('root-admin'));

root.render(
  <React.Suspense fallback={loading()}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Theme>
          <GlobalStyles />
          <GlobalContainer />
          <App />
        </Theme>
      </ConnectedRouter>
    </Provider>
  </React.Suspense>,
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const AppContainer = require('./App').default;
    root.render(
      <React.Suspense fallback={loading()}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Theme>
              <GlobalStyles />
              <GlobalContainer />
              <AppContainer />
            </Theme>
          </ConnectedRouter>
        </Provider>
      </React.Suspense>,
    );
  });
}
