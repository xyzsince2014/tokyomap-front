import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BrowserRouter} from 'react-router';

import store from './store';

// the cache for server state which useQuery() reads from
const queryClient = new QueryClient();

/**
 * Composition root: constructs the app-wide infrastructure singletons and provides them to the whole tree.
 */
const AppProvider: React.FC<React.PropsWithChildren> = ({children}) => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  </QueryClientProvider>
);

export default AppProvider;
