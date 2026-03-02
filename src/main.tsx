import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CmsProvider } from './cms/CmsProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CmsProvider>
      <App />
    </CmsProvider>
  </StrictMode>,
);
