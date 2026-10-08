import ReactDOM from 'react-dom'; // renderer
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import store from './store';

import './assets/scss/base.scss';

// the cache for server state which useQuery() reads from
const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root') as HTMLElement,
);
