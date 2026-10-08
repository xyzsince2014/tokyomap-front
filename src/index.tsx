import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import AppProvider from './AppProvider';
import App from './App';

import './assets/scss/base.scss';

// bootstrap: attach the React tree to the real DOM via React 18's createRoot
// <StrictMode> double-invokes effects in dev to surface unsafe side effects
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
