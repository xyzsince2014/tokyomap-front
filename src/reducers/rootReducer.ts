import {combineReducers} from 'redux';

import socketReducer, {SocketState} from './socketReducer';
import authReducer, {AuthState} from './authReducer';
import geolocationReducer, {GeolocationState} from './geolocationReducer';

export interface RootState {
  socketState: SocketState;
  authState: AuthState;
  geolocationState: GeolocationState;
}

const rootReducer = combineReducers<RootState>({
  socketState: socketReducer,
  authState: authReducer,
  geolocationState: geolocationReducer,
});

export default rootReducer;
