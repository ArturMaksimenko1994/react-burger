import { CLOSE_ORDER_INFO_MODAL } from "../action-types";
import { TOrderInfoDetailsModalActions } from "../actions/order-info-details";

export type TOrderInfoInitialState = {
  openModal: string | null;
}

const orderInfoInitialState: TOrderInfoInitialState = {
  openModal: null
};

export const orderInfoReducer = (
  state = orderInfoInitialState,
  action: TOrderInfoDetailsModalActions)
  : TOrderInfoInitialState => {
  switch (action.type) {
    case CLOSE_ORDER_INFO_MODAL: {
      return {
        ...state,
        openModal: null,
      };
    }
    default: {
      return state;
    }
  }
};