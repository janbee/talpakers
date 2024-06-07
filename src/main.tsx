import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './common/app-routes/AppRoutes.tsx';
import 'semantic-ui-css/semantic.min.css'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
