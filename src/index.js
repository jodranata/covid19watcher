import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { GlobalProvider } from './context/store';
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
