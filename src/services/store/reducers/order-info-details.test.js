import { orderInfoReducer } from './order-info-details';
import { CLOSE_ORDER_INFO_MODAL } from '../action-types';

const initialState = {
  openModal: null
};

describe('orderInfoReducer', () => {
  it('should return the initial state', () => {
    expect(orderInfoReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CLOSE_ORDER_INFO_MODAL', () => {
    const action = {
      type: CLOSE_ORDER_INFO_MODAL
    };
    expect(orderInfoReducer(initialState, action)).toEqual({
      ...initialState,
      openModal: null
    });
  });

  it('should return the current state for unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    expect(orderInfoReducer(initialState, unknownAction)).toEqual(initialState);
  });
});
