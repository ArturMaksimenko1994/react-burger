import React from 'react';
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/index';
import {thunk} from 'redux-thunk';

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_SEND_ORDERS
} from './action-types';

import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_GET_ORDERS,
  WS_AUTH_SEND_ORDERS,
  WS_AUTH_CONNECTION_START,
} from './action-types';

import { socketMiddleware } from '../middleware/socketMiddleware';
import { TWsSocketMiddlewareActions } from '../types/data';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsAuthUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions: TWsSocketMiddlewareActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_ORDERS,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS
};

const wsAuthActions: TWsSocketMiddlewareActions = {
  wsInit: WS_AUTH_CONNECTION_START,
  wsSendMessage: WS_AUTH_SEND_ORDERS,
  onOpen: WS_AUTH_CONNECTION_SUCCESS,
  onClose: WS_AUTH_CONNECTION_CLOSED,
  onError: WS_AUTH_CONNECTION_ERROR,
  onMessage: WS_AUTH_GET_ORDERS
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk,
    socketMiddleware(wsUrl, wsActions, false),
    socketMiddleware(wsAuthUrl, wsAuthActions, true)));
const store = createStore(rootReducer, enhancer);

export default store