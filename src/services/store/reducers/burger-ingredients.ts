import {
  BURGER_INGREDIENTS_FAILED,
  BURGER_INGREDIENTS_REQUEST,
  BURGER_INGREDIENTS_SUCCESS
} from "../action-types";
import { TBurgerIngredientsActions } from "../actions/burger-ingredients";
import { TIngredient } from "../../types/data";

export type TIngredientsInitialState = {
  ingredients: Array<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

const ingredientsInitialState: TIngredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
};

export const ingredientsReducer = (
  state = ingredientsInitialState,
  action: TBurgerIngredientsActions)
  : TIngredientsInitialState => {
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