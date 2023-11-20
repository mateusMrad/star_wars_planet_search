import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StarProvider from './context/StarProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <StarProvider>
      <App />
    </StarProvider>,
  );
