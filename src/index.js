import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { GLobalProvider, GlobalProvider } from './context/state';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
