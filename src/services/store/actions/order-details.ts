import { orderDetailsRequest } from "../../../api/api";

import {
  CLOSE_ORDER_MODAL,
  ORDER_DETAILS_FAILED,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS
} from "../action-types";

import { AppDispatch, AppThunk } from "../../types";

export interface IOrderDetailsModal {
  readonly type: typeof CLOSE_ORDER_MODAL;
}

export interface IOrderDetailsFailed {
  readonly type: typeof ORDER_DETAILS_FAILED;
}

export interface IOrderDetailsRequest {
  readonly type: typeof ORDER_DETAILS_REQUEST;
}

export interface IOrderDetailsSuccess {
  readonly type: typeof ORDER_DETAILS_SUCCESS;
  readonly number: number;
}

export type TOrderDetailsActions =
| IOrderDetailsModal
| IOrderDetailsFailed
| IOrderDetailsRequest
| IOrderDetailsSuccess;

export function closeOrderModal() {
  return {
    type: CLOSE_ORDER_MODAL,
  };
}

export const getOrderDetails: AppThunk = (order: Array<string>) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: ORDER_DETAILS_REQUEST
    });
    orderDetailsRequest(order)
      .then((res) => {
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          number: res.order.number
        });
      })
      .catch(() => {
        dispatch({
          type: ORDER_DETAILS_FAILED,
        });
      })
  };
}
