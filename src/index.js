import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './pages/App';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from 'redux/store';

const render = Component => {
  return ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('pages/App', () => {
    const NextApp = require('pages/App').default;
    render(NextApp);
  });
}

