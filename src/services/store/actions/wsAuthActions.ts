import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_GET_ORDERS,
  WS_AUTH_SEND_ORDERS,
  WS_AUTH_CONNECTION_START
} from '../action-types';
import { TFeedResponce } from '../../types/data';


interface IWsAuthConnectionStart {
  readonly type: typeof WS_AUTH_CONNECTION_START;
}
interface IWsAuthConnectionSuccess {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
}
interface IWsAuthConnectionError {
  readonly type: typeof WS_AUTH_CONNECTION_ERROR;
}
interface IWsAuthConnectionClosed {
  readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
}
interface IWsAuthGetMessage {
  readonly type: typeof WS_AUTH_GET_ORDERS;
  payload: TFeedResponce
}
interface IWsAuthSendMessage {
  readonly type: typeof WS_AUTH_SEND_ORDERS;
  payload: TFeedResponce
}

export type TWsAuthActions =
  | IWsAuthConnectionStart
  | IWsAuthConnectionSuccess
  | IWsAuthConnectionError
  | IWsAuthConnectionClosed
  | IWsAuthGetMessage
  | IWsAuthSendMessage;

export const wsAuthConnectionSuccess = (): IWsAuthConnectionSuccess => {
  return {
    type: WS_AUTH_CONNECTION_SUCCESS
  };
};

export const wsAuthConnectionOpen = (): IWsAuthConnectionStart => {
  return {
    type: WS_AUTH_CONNECTION_START
  }
}

export const wsAuthConnectionError = (): IWsAuthConnectionError => {
  return {
    type: WS_AUTH_CONNECTION_ERROR
  };
};

export const wsAuthConnectionClosed = (): IWsAuthConnectionClosed => {
  return {
    type: WS_AUTH_CONNECTION_CLOSED
  };
};

export const wsAuthGetMessage = (order: TFeedResponce): IWsAuthGetMessage => {
  return {
    type: WS_AUTH_GET_ORDERS,
    payload: order
  };
};

export const wsAuthSendMessage = (order: TFeedResponce): IWsAuthSendMessage => {
  return {
    type: WS_AUTH_SEND_ORDERS,
    payload: order
  };
};