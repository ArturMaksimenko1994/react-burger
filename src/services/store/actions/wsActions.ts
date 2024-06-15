import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_SEND_ORDERS,
  WS_CONNECTION_START
} from '../action-types';
import { TFeedResponce } from '../../types/data';

interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}
interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
interface IWsGetMessage {
  readonly type: typeof WS_GET_ORDERS;
  payload: TFeedResponce
}
interface IWsSendMessage {
  readonly type: typeof WS_SEND_ORDERS;
  payload: TFeedResponce
}

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage
  | IWsSendMessage;

export const wsConnectionSuccess = (): IWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionOpen = (): IWsConnectionStart => {
  return {
    type: WS_CONNECTION_START
  }
}

export const wsConnectionError = (): IWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = (): IWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetMessage = (order: TFeedResponce): IWsGetMessage => {
  return {
    type: WS_GET_ORDERS,
    payload: order
  };
};

export const wsSendMessage = (order: TFeedResponce): IWsSendMessage => {
  return {
    type: WS_SEND_ORDERS,
    payload: order
  };
};