import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { AppState } from '../reducers';
import rootSaga from "./sagas";

export const history: History = createBrowserHistory();
const initialState = window.initialAppState;

const store: Store = configureStore(history, initialState);

function configureStore(
  history: History,
  initialState: AppState
): Store<AppState> {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware()
  const store: Store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware
      )
    )
  );
  sagaMiddleware.run(rootSaga)
  return store
};

export default store;