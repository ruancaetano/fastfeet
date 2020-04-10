import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '~/config/ReactotronConfig';
import history from '~/services/history';
import GlobalStyles from '~/styles/global';

import { store, persistor } from '~/store';

import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <GlobalStyles />
          <ToastContainer />
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
