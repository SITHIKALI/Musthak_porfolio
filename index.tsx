import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initGsap, initStarParallax } from './services/gsapService';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Initialize GSAP plugins early
initGsap();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Wait a tick so DOM is mounted, then init star parallax and any DOM-scoped animations
setTimeout(() => {
  try {
    initStarParallax();
  } catch (e) {}
}, 50);