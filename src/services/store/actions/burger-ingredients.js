import { getIngredientsData } from "../../../api/api";

export const BURGER_INGREDIENTS_REQUEST = 'BURGER_INGREDIENTS_REQUEST';
export const BURGER_INGREDIENTS_SUCCESS = 'BURGER_INGREDIENTS_SUCCESS';
export const BURGER_INGREDIENTS_FAILED = 'BURGER_INGREDIENTS_FAILED';

export function getBurgerIngredients() {
  return function (dispatch) {
    dispatch({
      type: BURGER_INGREDIENTS_REQUEST
    });
    // Выполняем запрос к API
    getIngredientsData()
      .then((res) => {
        // Если запрос успешен, диспатчим успешное действие с полученными данными
        dispatch({
          type: BURGER_INGREDIENTS_SUCCESS,
          ingredients: res.data
        });
      })
      .catch((error) => {
        // Если произошла ошибка, диспатчим действие об ошибке
        console.error('Произошла проблема при выполнении запроса:', error);
        dispatch({
          type: BURGER_INGREDIENTS_FAILED,
          error: error
        });
      });
  };
}
