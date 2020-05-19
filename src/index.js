import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { InitProvider } from './context/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <InitProvider>
      <App />
    </InitProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
