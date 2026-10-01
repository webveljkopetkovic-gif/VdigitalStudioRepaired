import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { inject } from '@vercel/analytics';
import App from './App.tsx';
import { isContactRoute, isHomeRoute, isPrivacyRoute } from './i18n';
import './index.css';

// Initialize Vercel Web Analytics
inject();

const rootElement = document.getElementById('root')!;

const appTree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
const isKnownPrerenderedRoute =
  isHomeRoute(pathname) || isContactRoute(pathname) || isPrivacyRoute(pathname);

if (rootElement.hasChildNodes() && isKnownPrerenderedRoute) {
  hydrateRoot(rootElement, appTree);
} else {
  rootElement.innerHTML = '';
  createRoot(rootElement).render(appTree);
}
