import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { createBrowserHistory, History } from 'history';
import createSagaMiddleware from 'redux-saga';

import Config from "../config/config";
import rootReducer, { AppState } from '../reducers';
import rootSaga from "./sagas";

export const history: History = createBrowserHistory();
const initialState = window.initialAppState;

const client: AxiosInstance = axios.create({
  baseURL: `${Config.baseUrl}/api`,
  responseType: 'json'
})

client.interceptors.request.use((request: AxiosRequestConfig) => {
  return request;
});

axios.interceptors.response.use((response: AxiosResponse) => {
  return response;
});


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