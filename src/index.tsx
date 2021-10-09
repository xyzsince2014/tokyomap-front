import ReactDOM from 'react-dom'; // renderer
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import rootReducer from './reducers/rootReducer';
import authSaga from './sagas/auth/authSaga';
import geolocationSaga from './sagas/geolocationSaga';
import socketSaga from './sagas/socketSaga';

import './assets/scss/base.scss';

// use Redux Dev Tool for development, cf. https://github.com/zalmoxisus/redux-devtools-extension
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */
const composeEnhancer =
  process.env.NODE_ENV === 'development' &&
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */

const sagaMiddleWare = createSagaMiddleware();

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
const enhancer = composeEnhancer(applyMiddleware(sagaMiddleWare));
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
const store = createStore(rootReducer, enhancer);

sagaMiddleWare.run(authSaga);
sagaMiddleWare.run(geolocationSaga);
sagaMiddleWare.run(socketSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
