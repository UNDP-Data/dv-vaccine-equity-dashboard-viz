import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const getEl = (embedSelector: string) => {
  if (typeof embedSelector === 'string') {
    const el = document.querySelector(embedSelector);
    if (!el) {
      // eslint-disable-next-line no-console
      console.error(`No div matching selector "${embedSelector}"`);
      return null;
    }
    return el;
  }
  return embedSelector;
};

const visContainer = getEl('[data-bucket-embed]');
if (visContainer) {
  const rootEmbed = ReactDOM.createRoot(visContainer);
  rootEmbed.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
