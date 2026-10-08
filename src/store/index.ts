import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import socketReducer from './socketSlice';
import socketSaga from './socketSaga';

const sagaMiddleware = createSagaMiddleware();

// wire Redux DevTools and the default middleware
const store = configureStore({
  // a single reducer so the store state is just its slice's state
  reducer: socketReducer,
  // exclude redux-thunk from the default middleware as we use redux-saga instead, then append sagaMiddleware.
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV === 'development',
});

sagaMiddleware.run(socketSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
