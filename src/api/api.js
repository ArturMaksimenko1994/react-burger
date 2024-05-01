import {getCookie} from "../utils/utils";
import {BASE_URL} from "./api-сonfig";

// Функция для проверки ответа от сервера
const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error("Произошла ошибка при выполнении запроса.");
  }
  const data = response.json();
  console.log("Данные из API:", data); // Выводим данные в консоль
  return data;
};

// Функция для получения данных о ингредиентах
export const getIngredientsData = () => {
  return fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
};

// Функция для отправки заказа на сервер
export const orderDetailsRequest = async (productsId) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: productsId
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return checkResponse(res);
}

// Функция для получения данных об ингредиенте
export const getIngredientData = async () => {
  const res = await fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return checkResponse(res);
}

// Функция для отправки запроса на сброс пароля password-reset
export const forgotPassRequest = async email => {
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
    .then(checkResponse);
}

// Функция для отправки запроса на сброс пароля password-reset/reset
export const resetPassRequest = async (password, token) => {
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
    .then(checkResponse);
}

// Функция для отправки запроса на аутентификацию пользователя
export const loginRequest = async (email, password) => {
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
    .then(checkResponse);
}

// Функция для отправки запроса на регистрацию пользователя
export const resgisterUserRequest = async (email, password, name) => {
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
    .then(checkResponse);
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
    .then(checkResponse);
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
    .then(checkResponse);
}

// Функция для обновления данных пользователя
export const updateUserRequest = async (email, name, password) => {
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
    .then(checkResponse);
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
    .then(checkResponse);
}
