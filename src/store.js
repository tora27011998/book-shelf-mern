import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import {
  registerSaga,
  loginSaga,
  loginReducer as login,
  currentUserSaga,
} from './components/ducks';

const rootReducer = combineReducers({
  login,
});

export const rootSaga = function* rootSaga() {
  yield all([...registerSaga, ...loginSaga, ...currentUserSaga]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
