import {getIngredientsData} from "../../../api/api";

import {
  BURGER_INGREDIENTS_FAILED,
  BURGER_INGREDIENTS_REQUEST,
  BURGER_INGREDIENTS_SUCCESS
} from "../actions/burger-ingredients";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case BURGER_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: true
      };
    }
    case BURGER_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false
      };
    }
    case BURGER_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        ingredientsFailed: false
      };
    }
    default: {
      return state;
    }
  }
};

export function getBurgerIngredients() {
  return function (dispatch) {
    dispatch({
      type: BURGER_INGREDIENTS_REQUEST
    });
    getIngredientsData()
      .then((res) => {
        dispatch({
          type: BURGER_INGREDIENTS_SUCCESS,
          ingredients: res.data
        });
      })
      .catch(() => {
        dispatch({
          type: BURGER_INGREDIENTS_FAILED,
        });
      })
  };
}

