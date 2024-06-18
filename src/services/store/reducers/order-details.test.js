import {
  CLOSE_ORDER_MODAL,
  ORDER_DETAILS_FAILED,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS
} from '../action-types';
import { orderReducer, orderInitialState } from './order-details';

describe('orderReducer', () => {
  it('should return the initial state', () => {
    // Используем пустой объект действия
    expect(orderReducer(undefined, { type: undefined })).toEqual(orderInitialState);
  });

  it('should handle ORDER_DETAILS_REQUEST', () => {
    const newState = orderReducer(undefined, { type: ORDER_DETAILS_REQUEST });
    expect(newState).toEqual({
      ...orderInitialState,
      orderDetailsFailed: false,
      orderDetailsRequest: true
    });
  });

  it('should handle ORDER_DETAILS_FAILED', () => {
    const newState = orderReducer(undefined, { type: ORDER_DETAILS_FAILED });
    expect(newState).toEqual({
      ...orderInitialState,
      orderDetailsFailed: true,
      orderDetailsRequest: false
    });
  });

  it('should handle ORDER_DETAILS_SUCCESS', () => {
    const mockNumber = 12345;
    const newState = orderReducer(undefined, { type: ORDER_DETAILS_SUCCESS, number: mockNumber });
    expect(newState).toEqual({
      ...orderInitialState,
      number: mockNumber,
      orderDetailsFailed: false,
      orderDetailsRequest: false
    });
  });

  it('should handle CLOSE_ORDER_MODAL', () => {
    const newState = orderReducer(undefined, { type: CLOSE_ORDER_MODAL });
    expect(newState).toEqual({
      ...orderInitialState,
      number: null,
      orderDetailsFailed: false,
      orderDetailsRequest: false
    });
  });

  it('should return the current state for unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const currentState = { ...orderInitialState, number: 123 };
    const newState = orderReducer(currentState, unknownAction);
    expect(newState).toEqual(currentState);
  });
});
