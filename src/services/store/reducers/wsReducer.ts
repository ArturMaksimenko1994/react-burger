import {
  WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_GET_ORDERS, WS_CONNECTION_CLOSED,
} from '../action-types';

import { TFeed } from '../../types/data';
import {TWsActions} from "../actions/wsActions";

export type TWsAuthinitialState = {
  wsConnected: boolean;
  orders: TFeed[],
  total: number;
  totalToday: number;
};

const initialState: TWsAuthinitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsReducer = (
  state = initialState,
  action: TWsActions)
  : TWsAuthinitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};