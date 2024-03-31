import {BASE_URL} from "./api-сonfig";

export const getIngredientsData = () => {
  return fetch(`${BASE_URL}/ingredients`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Проблема с fetch запросом');
      }
      return res.json();
    })
    .catch(error => {
      console.error('Произошла проблема при выполнении запроса:', error);
      throw error; // Перебрасываем ошибку для дальнейшей обработки
    });
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
  console.log(response)
  return response.json();
};