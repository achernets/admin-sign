import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import * as asyncInitialState from 'redux-async-initial-state';
import { i18nReducer } from 'react-redux-i18n';
import { reducer as modalProvider } from 'react-redux-modal-provider';
import auth from './auth';
import settings from './settings';
import systemUsers from './systemUsers';
import accounts from './accounts';
export default history =>
  asyncInitialState.outerReducer(
    combineReducers({
      router: connectRouter(history),
      asyncInitialState: asyncInitialState.innerReducer,
      i18n: i18nReducer,
      modalProvider,
      auth,
      settings,
      systemUsers,
      accounts
    })
  );