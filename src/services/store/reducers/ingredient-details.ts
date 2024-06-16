import {
  CLOSE_INGREDIENT_MODAL,
  OPEN_INGREDIENT_MODAL
} from "../action-types";
import { TIngredientModalActions, IIngredientOpenModal } from "../actions/ingredient-details";

import { TIngredient } from "../../types/data";

export type TIngredientInitialState = {
  openModal: TIngredient | null;
}

const ingredientInitialState: TIngredientInitialState = {
  openModal: null
};

export const ingredientReducer = (
  state = ingredientInitialState,
  action: TIngredientModalActions
): TIngredientInitialState => {
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...state,
        openModal: (action as IIngredientOpenModal).ingredient,
      };
    }
    case CLOSE_INGREDIENT_MODAL: {
      return {
        ...state,
        openModal: null,
      };
    }
    default: {
      return state;
    }
  }
};
