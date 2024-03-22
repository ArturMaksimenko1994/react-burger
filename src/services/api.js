import {BASE_URL} from "../utils/apiConfig";

// получаем все ингридиенты
export const getIngredients = (setProducts) => {
  // setState({ ...state, hasError: false, isLoading: true });
  fetch(`${BASE_URL}/ingredients`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Проблема с fetch запросом');
      }
      return res.json();
    })
    .then(data => {
      setProducts({items:data.data,isLoading:false,hasError:false})
    })
    .catch(error => {
      // setState({ ...state, hasError: true, isLoading: false });
      console.error('Произошла проблема при выполнении запроса:', error);
    });
};

// Функция для отправки запроса на создание заказа
export const createOrder = async (ingredients, setOrderNumber) => {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });
    const data = await checkResponse(response);
    setOrderNumber(data.order.number);
  } catch (error) {
    console.error("Ошибка:", error);
    // Обработка ошибок, например, вывод сообщения об ошибке пользователю
  }
};

// Функция для проверки ответа от сервера
const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error("Произошла ошибка при выполнении запроса.");
  }
  return response.json();
};