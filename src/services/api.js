import {BASE_URL} from "../utils/api";

// получаем все ингридиенты
export const getIngredients = (setProducts) => {
  // setState({ ...state, hasError: false, isLoading: true });
  fetch(BASE_URL)
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