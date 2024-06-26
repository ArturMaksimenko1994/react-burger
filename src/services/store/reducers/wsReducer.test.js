import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_GET_ORDERS,
    WS_CONNECTION_CLOSED
  } from '../action-types';
  import { wsReducer } from './wsReducer';
  
  describe('wsReducer', () => {
    const initialState = {
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
    };
  
    it('should return the initial state', () => {
      expect(wsReducer(undefined, {})).toEqual(initialState);
    });
  
    it('should handle WS_CONNECTION_SUCCESS', () => {
      const newState = wsReducer(undefined, { type: WS_CONNECTION_SUCCESS });
      expect(newState).toEqual({
        ...initialState,
        wsConnected: true
      });
    });
  
    it('should handle WS_CONNECTION_ERROR', () => {
      const newState = wsReducer(undefined, { type: WS_CONNECTION_ERROR });
      expect(newState).toEqual({
        ...initialState,
        wsConnected: false
      });
    });
  
    it('should handle WS_CONNECTION_CLOSED', () => {
      const newState = wsReducer(undefined, { type: WS_CONNECTION_CLOSED });
      expect(newState).toEqual({
        ...initialState,
        wsConnected: false
      });
    });
  
    it('should handle WS_GET_ORDERS', () => {
      const mockPayload = {
        orders: [{ id: 1, name: 'Test Order' }],
        total: 100,
        totalToday: 10
      };
      const newState = wsReducer(undefined, { type: WS_GET_ORDERS, payload: mockPayload });
      expect(newState).toEqual({
        ...initialState,
        orders: mockPayload.orders,
        total: mockPayload.total,
        totalToday: mockPayload.totalToday
      });
    });
  
    it('should return the current state for unknown action', () => {
      const unknownAction = { type: 'UNKNOWN_ACTION' };
      const currentState = { ...initialState, wsConnected: true };
      const newState = wsReducer(currentState, unknownAction);
      expect(newState).toEqual(currentState);
    });
  });
  