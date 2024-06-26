import {
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_GET_ORDERS
  } from '../action-types';
  import { wsAuthReducer } from './wsAuthReducer';
  
  describe('wsAuthReducer', () => {
    const initialState = {
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
    };
  
    it('should return the initial state', () => {
      expect(wsAuthReducer(undefined, {})).toEqual(initialState);
    });
  
    it('should handle WS_AUTH_CONNECTION_SUCCESS', () => {
      const newState = wsAuthReducer(undefined, { type: WS_AUTH_CONNECTION_SUCCESS });
      expect(newState).toEqual({
        ...initialState,
        wsConnected: true
      });
    });
  
    it('should handle WS_AUTH_CONNECTION_ERROR', () => {
      const newState = wsAuthReducer(undefined, { type: WS_AUTH_CONNECTION_ERROR });
      expect(newState).toEqual({
        ...initialState,
        wsConnected: false
      });
    });
  
    it('should handle WS_AUTH_CONNECTION_CLOSED', () => {
      const newState = wsAuthReducer(undefined, { type: WS_AUTH_CONNECTION_CLOSED });
      expect(newState).toEqual({
        ...initialState,
        wsConnected: false
      });
    });
  
    it('should handle WS_AUTH_GET_ORDERS', () => {
      const mockPayload = {
        orders: [{ id: 1, name: 'Test Order' }],
        total: 100,
        totalToday: 10
      };
      const newState = wsAuthReducer(undefined, { type: WS_AUTH_GET_ORDERS, payload: mockPayload });
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
      const newState = wsAuthReducer(currentState, unknownAction);
      expect(newState).toEqual(currentState);
    });
  });
  