import {BASE_URL} from "./api-сonfig";

export const getIngredientsData = () => {
  return fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
};

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

// Функция для проверки ответа от сервера
const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error("Произошла ошибка при выполнении запроса.");
  }
  const data = response.json();
  console.log("Данные из API:", data); // Выводим данные в консоль
  return data;
};