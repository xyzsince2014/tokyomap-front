import {combineReducers} from 'redux';

import socketReducer, {SocketState} from './socketReducer';

export interface RootState {
  socketState: SocketState;
}

const rootReducer = combineReducers<RootState>({
  socketState: socketReducer,
});

export default rootReducer;
