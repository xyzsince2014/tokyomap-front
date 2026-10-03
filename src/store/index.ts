import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import socketReducer, { SocketState } from './socketSlice';
import socketSaga from '../sagas/socketSaga';

// the store holds a single slice (socket), so the whole store state is just that slice's state.
export type RootState = SocketState;

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */
const composeEnhancer =
  process.env.NODE_ENV === 'development' &&
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */

const sagaMiddleware = createSagaMiddleware();

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
const store = createStore(socketReducer, composeEnhancer(applyMiddleware(sagaMiddleware)));
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */

sagaMiddleware.run(socketSaga);

export default store;
