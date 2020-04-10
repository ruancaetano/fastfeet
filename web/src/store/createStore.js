import { applyMiddleware, compose, createStore } from 'redux';

export default (reducers, middlewares) => {
  return createStore(
    reducers,
    console.tron
      ? compose(applyMiddleware(...middlewares), console.tron.createEnhancer())
      : applyMiddleware(...middlewares)
  );
};
