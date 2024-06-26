import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FORM_FAILED,
  LOGIN_FORM_REQUEST,
  LOGIN_FORM_SET_VALUE,
  LOGIN_FORM_SUCCESS,
  LOGOUT_FORM_FAILED,
  LOGOUT_FORM_REQUEST,
  LOGOUT_FORM_SUCCESS,
  PATCH_USER_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  REGISTER_FORM_FAILED,
  REGISTER_FORM_REQUEST,
  REGISTER_FORM_SET_VALUE,
  REGISTER_FORM_SUCCESS,
  RESET_FORM_SET_VALUE,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_TOKEN_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS
} from '../action-types';
import { authReducer } from './auth';

describe('authReducer', () => {
  const initialState = {
    message: '',
    forgetPassRequest: false,
    forgetPassFailed: false,
    forgetPassSuccess: false,

    resetPassRequest: false,
    resetPassFailed: false,
    resetPassSuccess: false,

    form: {
      email: '',
      password: '',
      code: '',
      name: ''
    },

    user: {
      email: '',
      name: '',
    },

    loginRequest: false,
    loginFailed: false,
    loginSuccess: false,

    logoutRequest: false,
    logoutFailed: false,

    getUserRequest: false,
    getUserFailed: false,

    updateUserRequest: false,
    updateUserFailed: false,

    updateTokenRequest: false,
    updateTokenSuccess: false,
    updateTokenFailed: false,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_USER_REQUEST', () => {
    const newState = authReducer(undefined, { type: GET_USER_REQUEST });
    expect(newState).toEqual({
      ...initialState,
      getUserRequest: true,
      getUserFailed: false,
    });
  });

  it('should handle GET_USER_FAILED', () => {
    const newState = authReducer(undefined, { type: GET_USER_FAILED });
    expect(newState).toEqual({
      ...initialState,
      getUserRequest: false,
      getUserFailed: true,
    });
  });

  it('should handle GET_USER_SUCCESS', () => {
    const mockUser = { email: 'test@test.com', name: 'Test User' };
    const newState = authReducer(undefined, { type: GET_USER_SUCCESS, user: mockUser });
    expect(newState).toEqual({
      ...initialState,
      user: mockUser,
      getUserRequest: false,
      getUserFailed: false,
    });
  });

  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    const newState = authReducer(undefined, { type: FORGOT_PASSWORD_REQUEST });
    expect(newState).toEqual({
      ...initialState,
      forgetPassRequest: true,
      forgetPassFailed: false,
    });
  });

  it('should handle FORGOT_PASSWORD_FAILED', () => {
    const newState = authReducer(undefined, { type: FORGOT_PASSWORD_FAILED });
    expect(newState).toEqual({
      ...initialState,
      forgetPassRequest: false,
      forgetPassFailed: true,
    });
  });

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    const mockMessage = 'Password reset link sent';
    const newState = authReducer(undefined, { type: FORGOT_PASSWORD_SUCCESS, message: mockMessage });
    expect(newState).toEqual({
      ...initialState,
      form: {
        ...initialState.form,
        email: '',
      },
      message: mockMessage,
      forgetPassRequest: false,
      forgetPassFailed: false,
      forgetPassSuccess: true,
    });
  });

  it('should handle RESET_FORM_SET_VALUE', () => {
    const field = 'email';
    const value = 'test@test.com';
    const newState = authReducer(undefined, { type: RESET_FORM_SET_VALUE, field, value });
    expect(newState).toEqual({
      ...initialState,
      form: {
        ...initialState.form,
        [field]: value,
      },
    });
  });

  it('should handle RESET_PASSWORD_REQUEST', () => {
    const newState = authReducer(undefined, { type: RESET_PASSWORD_REQUEST });
    expect(newState).toEqual({
      ...initialState,
      resetPassRequest: true,
      resetPassFailed: false,
    });
  });

  it('should handle RESET_PASSWORD_FAILED', () => {
    const newState = authReducer(undefined, { type: RESET_PASSWORD_FAILED });
    expect(newState).toEqual({
      ...initialState,
      resetPassRequest: false,
      resetPassFailed: true,
    });
  });

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    const newState = authReducer(undefined, { type: RESET_PASSWORD_SUCCESS });
    expect(newState).toEqual({
      ...initialState,
      resetPassRequest: false,
      resetPassFailed: false,
      resetPassSuccess: true,
    });
  });

  it('should handle LOGIN_FORM_SET_VALUE', () => {
    const field = 'email';
    const value = 'test@test.com';
    const newState = authReducer(undefined, { type: LOGIN_FORM_SET_VALUE, field, value });
    expect(newState).toEqual({
      ...initialState,
      form: {
        ...initialState.form,
        [field]: value,
      },
    });
  });

  it('should handle LOGIN_FORM_REQUEST', () => {
    const newState = authReducer(undefined, { type: LOGIN_FORM_REQUEST });
    expect(newState).toEqual({
      ...initialState,
      loginRequest: true,
      loginFailed: false,
    });
  });

  it('should handle LOGIN_FORM_FAILED', () => {
    const newState = authReducer(undefined, { type: LOGIN_FORM_FAILED });
    expect(newState).toEqual({
      ...initialState,
      loginRequest: false,
      loginFailed: true,
    });
  });

  it('should handle LOGIN_FORM_SUCCESS', () => {
    const mockUser = { email: 'test@test.com', name: 'Test User' };
    const newState = authReducer(undefined, { type: LOGIN_FORM_SUCCESS, user: mockUser });
    expect(newState).toEqual({
      ...initialState,
      user: mockUser,
      form: {
        ...initialState.form,
        email: '',
        password: '',
      },
      loginRequest: false,
      loginFailed: false,
      loginSuccess: true,
    });
  });

  it('should handle LOGOUT_FORM_REQUEST', () => {
    const newState = authReducer(undefined, { type: LOGOUT_FORM_REQUEST });
    expect(newState).toEqual({
      ...initialState,
      logoutRequest: true,
      logoutFailed: false,
    });
  });

  it('should handle LOGOUT_FORM_FAILED', () => {
    const newState = authReducer(undefined, { type: LOGOUT_FORM_FAILED });
    expect(newState).toEqual({
      ...initialState,
      logoutRequest: false,
      logoutFailed: true,
    });
  });

  it('should handle LOGOUT_FORM_SUCCESS', () => {
    const newState = authReducer(undefined, { type: LOGOUT_FORM_SUCCESS });
    expect(newState).toEqual({
      ...initialState,
      user: {
        ...initialState.user,
        email: '',
        name: '',
      },
      logoutRequest: false,
      logoutFailed: true,
    });
  });

  it('should handle REGISTER_FORM_SET_VALUE', () => {
    const field = 'name';
    const value = 'Test User';
    const newState = authReducer(undefined, { type: REGISTER_FORM_SET_VALUE, field, value });
    expect(newState).toEqual({
      ...initialState,
      form: {
        ...initialState.form,
        [field]: value,
      },
    });
  });

  it('should handle REGISTER_FORM_REQUEST', () => {
    const newState = authReducer(undefined, { type: REGISTER_FORM_REQUEST });
    expect(newState).toEqual({
      ...initialState,
      loginRequest: true,
      loginFailed: false,
    });
  });

  it('should handle REGISTER_FORM_FAILED', () => {
    const newState = authReducer(undefined, { type: REGISTER_FORM_FAILED });
    expect(newState).toEqual({
      ...initialState,
      loginRequest: false,
      loginFailed: true,
    });
  });

  it('should handle REGISTER_FORM_SUCCESS', () => {
    const mockUser = { email: 'test@test.com', name: 'Test User' };
    const newState = authReducer(undefined, { type: REGISTER_FORM_SUCCESS, user: mockUser });
    expect(newState).toEqual({
      ...initialState,
      user: mockUser,
      form: {
        ...initialState.form,
        email: '',
        password: '',
        name: ''
      },
      loginRequest: false,
      loginFailed: false,
      loginSuccess: true,
    });
  });

  it('should handle PATCH_USER_REQUEST', () => {
    const newState = authReducer(undefined, { type: PATCH_USER_REQUEST });
    expect(newState).toEqual({
      ...initialState,
      updateUserRequest: true,
      updateUserFailed: false,
    });
  });

  it('should handle PATCH_USER_FAILED', () => {
    const newState = authReducer(undefined, { type: PATCH_USER_FAILED });
    expect(newState).toEqual({
      ...initialState,
      updateUserRequest: false,
      updateUserFailed: true,
    });
  });

  it('should handle PATCH_USER_SUCCESS', () => {
    const mockUser = { email: 'test@test.com', name: 'Test User' };
    const newState = authReducer(undefined, { type: PATCH_USER_SUCCESS, user: mockUser });
    expect(newState).toEqual({
      ...initialState,
      user: mockUser,
      form: {
        ...initialState.form,
        email: '',
        password: '',
        name: ''
      },
      updateUserRequest: false,
      updateUserFailed: false,
    });
  });

  it('should handle UPDATE_TOKEN_REQUEST', () => {
    const newState = authReducer(undefined, { type: UPDATE_TOKEN_REQUEST });
    expect(newState).toEqual({
      ...initialState,
      updateTokenRequest: true,
      updateTokenFailed: false,
    });
  });

  it('should handle UPDATE_TOKEN_FAILED', () => {
    const newState = authReducer(undefined, { type: UPDATE_TOKEN_FAILED });
    expect(newState).toEqual({
      ...initialState,
      updateTokenRequest: false,
      updateTokenFailed: true,
    });
  });

  it('should handle UPDATE_TOKEN_SUCCESS', () => {
    const newState = authReducer(undefined, { type: UPDATE_TOKEN_SUCCESS });
    expect(newState).toEqual({
      ...initialState,
      updateTokenRequest: false,
      updateTokenSuccess: true,
      updateTokenFailed: false,
    });
  });

  it('should return the current state for unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const currentState = { ...initialState, loginRequest: true };
    const newState = authReducer(currentState, unknownAction);
    expect(newState).toEqual(currentState);
  });
});
