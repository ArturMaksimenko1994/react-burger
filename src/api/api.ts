import {getCookie} from "../utils/utils";
import {BASE_URL} from "./api-сonfig";

import {
  TIngredientResponse,
  TOrderDetailsResponse,
  TUserLogoutResponse,
  TUserResponce
} from '../services/types/data';

// Функция для проверки ответа от сервера
export const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: code ${res.status}`);
  }
}

// Функция для получения данных о ингредиентах
export const getIngredientsData = () => {
  return fetch(`${BASE_URL}/ingredients`)
    .then(res => checkResponse<TIngredientResponse>(res));
};

// Функция для отправки заказа на сервер
export const orderDetailsRequest = async (productsId: string[]) => {
  return await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: productsId
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkResponse<TOrderDetailsResponse>(res));
}

// Функция для получения данных об ингредиенте
export const getIngredientData = async () => {
  return await fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => checkResponse<TIngredientResponse>(res));
}

// Функция для отправки запроса на сброс пароля password-reset
export const forgotPassRequest = async (email: string) => {
  return await fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    body: JSON.stringify(
      email
    ),
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
    .then(res => checkResponse<TUserResponce>(res));
}

// Функция для отправки запроса на сброс пароля password-reset/reset
export const resetPassRequest = async (password: string, token: string | any) => {
  return await fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    body: JSON.stringify(
      password,
      token,
    ),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => checkResponse<TUserResponce>(res));
}

// Функция для отправки запроса на аутентификацию пользователя
export const loginRequest = async (email: string, password: string) => {
  return await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(res => checkResponse<TUserLogoutResponse>(res));
}

// Функция для отправки запроса на регистрацию пользователя
export const resgisterUserRequest = async (email: string, password: string, name: string) => {
  return await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => checkResponse<TUserResponce>(res));
}

// Функция для отправки запроса на выход пользователя
export const logoutRequest = async () => {
  return await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })
    .then(res => checkResponse<TUserResponce>(res));
}

// Функция для получения данных пользователя
export const getUserRequest = async () => {
  return await fetch(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
  })
    .then(res => checkResponse<TUserResponce>(res));
}

// Функция для обновления данных пользователя
export const updateUserRequest = async (email: string, name: string, password: string) => {
  return await fetch(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
  })
    .then(res => checkResponse<TUserResponce>(res));
}

// Функция для обновления токена аутентификации
export const updateTokenRequest = async () => {
  return await fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })
    .then(res => checkResponse<TUserResponce>(res));
}
