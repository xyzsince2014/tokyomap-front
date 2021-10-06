import {combineReducers} from 'redux';
import socketReducer, {SocketState} from './socketReducer';
import authReducer, {AuthState} from './authReducer';

export interface RootState {
  socketState: SocketState;
  authState: AuthState;
}

const rootReducer = combineReducers<RootState>({
  socketState: socketReducer,
  authState: authReducer,
});

export default rootReducer;
