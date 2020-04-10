import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import createStore from './createStore';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import persistReducer from './persistReducer';

const sagaMiddleware = createSagaMiddleware(
  console.tron ? { sagaMonitor: console.tron.createSagaMonitor() } : {}
);

const middlewares = [sagaMiddleware];

const store = createStore(persistReducer(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
