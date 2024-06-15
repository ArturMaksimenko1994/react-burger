import {
  forgotPassRequest,
  getUserRequest,
  loginRequest,
  logoutRequest,
  resetPassRequest,
  updateUserRequest,
  resgisterUserRequest,
  updateTokenRequest
} from "../../../api/api";

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
} from "../action-types";

import { deleteCookie, setCookie } from "../../../utils/utils";
import { AppDispatch, AppThunk } from "../../types/index";
import { TUser, TUserResponce } from "../../types/data";

interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  message: string;
}

interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export const forgotPassword: AppThunk = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    forgotPassRequest(email)
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          message: res.message
        });
      })
      .catch(() => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      })
  };
}

interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

interface ISetResetFormValue {
  value: string;
  field: string;
  readonly type: typeof RESET_FORM_SET_VALUE;
}

export const setResetFormValue = (field: string, value: string) => ({
  type: RESET_FORM_SET_VALUE,
  field,
  value,
});

export const resetPassword: AppThunk = (password: string, token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    resetPassRequest(password, token)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      })
  };
}

interface ISingInRequest {
  readonly type: typeof LOGIN_FORM_REQUEST;
}

interface ISingInSuccess {
  readonly type: typeof LOGIN_FORM_SUCCESS;
  readonly user: TUser;
}

interface ISingInFailed {
  readonly type: typeof LOGIN_FORM_FAILED;
}

interface ISetLoginFormValue {
  readonly type: typeof LOGIN_FORM_SET_VALUE;
  value: string;
  field: string;
}

export const setLoginFormValue = (field: string, value: string) => ({
  type: LOGIN_FORM_SET_VALUE,
  field,
  value,
});

export const singIn: AppThunk = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_FORM_REQUEST,
    });
    loginRequest(email, password)
      .then(res => {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return res;
      })
      .then((res) => {
        dispatch({
          type: LOGIN_FORM_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGIN_FORM_FAILED,
        });
      })
  };
}

interface ISingOutRequest {
  readonly type: typeof LOGOUT_FORM_REQUEST;
}

interface ISingOutSuccess {
  readonly type: typeof LOGOUT_FORM_SUCCESS;
}

interface ISingOutFailed {
  readonly type: typeof LOGOUT_FORM_FAILED;
}

export const singOut: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_FORM_REQUEST,
    });
    logoutRequest()
      .then(res => {
        const refreshToken = res.refreshToken;
        deleteCookie('token');
        localStorage.removeItem(refreshToken);
        if (res && res.success) {
          dispatch({
            type: LOGOUT_FORM_SUCCESS,
          });
        } else {
          dispatch({ type: LOGOUT_FORM_FAILED });
        }
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_FORM_FAILED,
        });
      })
  };
}

interface IRegisterUserRequest {
  readonly type: typeof REGISTER_FORM_REQUEST;
}

interface IRegisterUserSuccess {
  readonly type: typeof REGISTER_FORM_SUCCESS;
  readonly user: TUser;
}

interface IRegisterUserFailed {
  readonly type: typeof REGISTER_FORM_FAILED;
}

interface ISetRegisterFormValue {
  readonly type: typeof REGISTER_FORM_SET_VALUE;
  value: string;
  field: string;
}

export const setRegisterFormValue = (field: string, value: string) => ({
  type: REGISTER_FORM_SET_VALUE,
  field,
  value,
});

export const registerUser: AppThunk = (email: string, password: string, name: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_FORM_REQUEST,
    });
    resgisterUserRequest(email, password, name)
      .then(res => {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return res;
      })
      .then((res) => {
        dispatch({
          type: REGISTER_FORM_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: REGISTER_FORM_FAILED,
        });
      })
  };
}

interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}

interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}

export const getUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUserRequest()
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_USER_FAILED,
        });
      })
  };
}

interface IUpdateUserRequest {
  readonly type: typeof PATCH_USER_REQUEST;
}

interface IUpdateUserSuccess {
  readonly type: typeof PATCH_USER_SUCCESS;
  readonly user: TUser;
}

interface IUpdateUserFailed {
  readonly type: typeof PATCH_USER_FAILED;
}

export const updateUser: AppThunk = (email: string, name: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: PATCH_USER_REQUEST,
    });
    updateUserRequest(email, name, password)
      .then((res) => {
        dispatch({
          type: PATCH_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: PATCH_USER_FAILED,
        });
      })
  };
}

interface IUpdateTokenRequest {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}

interface IUpdateTokenSuccess {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
}

interface IUpdateTokenFailed {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}

export const updateToken: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: UPDATE_TOKEN_REQUEST })
    updateTokenRequest()
      .then((res) => {
        const authToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('token', authToken);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
        })
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
        });
      });
  }
}

export type TAuthActions =
| IForgotPasswordFailed
| IForgotPasswordRequest
| IForgotPasswordSuccess
| IGetUserFailed
| IGetUserRequest
| IGetUserSuccess
| IRegisterUserFailed
| IRegisterUserRequest
| IRegisterUserSuccess
| IResetPasswordFailed
| IResetPasswordRequest
| IResetPasswordSuccess
| ISingInFailed
| ISingInRequest
| ISingInSuccess
| ISingOutFailed
| ISingOutRequest
| ISingOutSuccess
| IUpdateTokenFailed
| IUpdateTokenRequest
| IUpdateTokenSuccess
| IUpdateUserFailed
| IUpdateUserRequest
| IUpdateUserSuccess
| ISetResetFormValue
| ISetLoginFormValue
| ISetRegisterFormValue;