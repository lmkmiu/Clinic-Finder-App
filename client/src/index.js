import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './AppContext';
import UserProvider from './component/Authentication/UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AppProvider>
);
