import React from 'react'; // React core
import ReactDOM from 'react-dom'; // renderer
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import rootReducer from './reducers/rootReducer';
import socketSaga from './sagas/socket/socketSaga';
import authSaga from './sagas/auth/authSaga';

import './assets/scss/base.scss';

// store enhancers for Redux Dev Tool
// cf. https://github.com/jhen0409/react-native-debugger/issues/280
const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  typeof window === 'object' &&
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
/* eslint-enable @typescript-eslint/no-explicit-any */

const sagaMiddleWare = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleWare));
const store = createStore(rootReducer, enhancer);

sagaMiddleWare.run(socketSaga);
sagaMiddleWare.run(authSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
