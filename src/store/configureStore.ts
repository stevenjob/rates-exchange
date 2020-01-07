import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const configureStore = (preloadedState = {}) => {
  const middlewares: any[] = [thunk];

  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(...middlewares),
      (window as any).devToolsExtension
        ? (window as any).devToolsExtension()
        : (value: any) => value
    )
  );

  return store;
};

export default configureStore;
