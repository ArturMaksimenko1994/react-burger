import {
  CLOSE_ORDER_MODAL,
  ORDER_DETAILS_FAILED,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS
} from "../action-types";
import { TOrderDetailsActions } from "../actions/order-details";

export type TOrderInitialState = {
  orderDetailsFailed: boolean;
  number: number | null;
  orderDetailsRequest: boolean;
}

const orderInitialState: TOrderInitialState = {
  orderDetailsFailed: false,
  number: null,
  orderDetailsRequest: false
};

export const orderReducer = (
  state = orderInitialState,
  action: TOrderDetailsActions)
  : TOrderInitialState => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        orderDetailsFailed: false,
        orderDetailsRequest: true
      };
    }
    case ORDER_DETAILS_FAILED: {
      return {
        ...state,
        orderDetailsFailed: true,
        orderDetailsRequest: false
      };
    }
    case ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        number: action.number,
        orderDetailsRequest: false,
        orderDetailsFailed: false
      };
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        number: null,

      };
    }
    default: {
      return state;
    }
  }
};