import { CLOSE_ORDER_INFO_MODAL } from "../action-types/order-info-detailsTypes";

export interface IOrderInfoDetailsCloseModal {
  readonly type: typeof CLOSE_ORDER_INFO_MODAL;
}

export type TOrderInfoDetailsModalActions =
  | IOrderInfoDetailsCloseModal;

export const closeOrderInfoModal = (): IOrderInfoDetailsCloseModal => {
  return {
    type: CLOSE_ORDER_INFO_MODAL,
  };
}