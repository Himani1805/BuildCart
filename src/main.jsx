import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Importing Redux Provider and the Central Store
import { Provider } from 'react-redux';
import { store } from './store/store.js';

// Importing Global Configurations
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

// Wrapping the Application inside Redux Provider to enable Global State
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);